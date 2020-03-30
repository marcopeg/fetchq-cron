# Sharding

the will be the need to split data into different queues in order to
retain linear performances with data growth.

## Hypotesis

Sharding could be applied at `group` level, give that we decide before hand
a maxItems for any group.

Say we set `groups.maxItems=10` and `queue.maxGroups=10` then we will store a
maximum of 100 tasks per queue, with the need of upserting new queues as new
groups gets created.

## Required Changes

### fetchq_cron.groups_index:

| field       | description                               |
| ----------- | ----------------------------------------- |
| group_name  | group name                                |
| queue_name  | queue that receives the group's tasks     |
| tasks_count | eventually consistent amount of documents |

The `count` field is the product of a write ahead log of counters where we log
variations (+1-1) at task create / delete time. A mechanism that is similar to
the counters internal to Fetchq.

### fetchq_cron.groups_wal:

| field      | description                                           |
| ---------- | ----------------------------------------------------- |
| etag       | some form of progressive number for key/sorting       |
| group_name | group name, foreign key to `fetchq_cron.groups_index` |
| amount     | integer, +1 / -1                                      |

### fetchq_cron.shards_index:

| field        | description                                   |
| ------------ | --------------------------------------------- |
| queue_name   | uuid? is it too long for a fetchq queue name? |
| groups_count | eventually consistent amount of groups        |

When the maintenance sharding task hits, it should use this table to
assess whether to create more shards.

### fetchq_cron.shards_wal:

| field      | description                                           |
| ---------- | ----------------------------------------------------- |
| etag       | some form of progressive number for key/sorting       |
| shard_name | group name, foreign key to `fetchq_cron.shards_index` |
| amount     | integer, +1 / -1                                      |

### Maintenance Processes:

We need to introduce a maintenance process that consumes the `groups_wal`
and updates the `fetchq_cron.groups_index`.
(this should run quite quickly)

We need to introduce a maintenance process that consumes the `shards_wal`
and updates the `fetchq_cron.shards_index`.
(this should run quite quickly)

We need to upsert new shards based on current data load.
This task should iterate through the existing shards, and if a threshold
is met, it should generate new shards.
When there is the need to generate new shards, then the system should generate
_some_ instead of just one, the more shards gets prepared, the slower this
task should run.

### API

It may be a good idea to separate INSERT / UPATE calls for a specific task
so that we drop the requirement for a `task_name`.

Tasks should be appended and only the group would be relevant as index in the
payload. At this point, the description may be used as task name when showing
out the list and details.

### Create a Group API

- select shard with least groups -> `queue_name`
- insert into `group_index`
- append increment to `shards_wal` (if was created)
- return `queue_name`

### Create a Task

👉 A group must be defined before creating a task.

- select `queue_name` from group
- (fail if threshold is crossed)
- fetchq_upsert(`queue_name`, doc)
- append increment to `groups_wal` (if was_created)

## Generate new shards (maintenance process)

- compact `shards_wal`
- select shards (groups_count > threshold)
- IF: no rows, exit
- for (i < expand_limit)
  - create new shard
  - create new queue with shard name
