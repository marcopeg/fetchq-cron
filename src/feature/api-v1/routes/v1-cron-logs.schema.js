const params = {
  type: 'object',
  additionalProperties: false,
  properties: {
    groupName: {
      type: 'string',
    },
    taskName: {
      type: 'string',
    },
  },
};

const query = {
  type: 'object',
  additionalProperties: false,
  properties: {
    limit: {
      type: 'integer',
    },
    cursor: {
      type: 'integer',
    },
  },
};

const v1LogsSchema = {
  params,
  query,
};

const v1LogsSchemaGroup = {
  params: {
    ...params,
    required: ['groupName'],
  },
  query,
};

const v1LogsSchemaTask = {
  params: {
    ...params,
    required: ['groupName', 'taskName'],
  },
  query,
};

module.exports = {
  v1LogsSchema,
  v1LogsSchemaGroup,
  v1LogsSchemaTask,
};
