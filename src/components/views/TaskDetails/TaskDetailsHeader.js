import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { taskShape } from '../../../data-types/task';
import DetailsSection from '../../../layouts/DetailsSection';
import DisplayDate from '../../DisplayDate';

const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
    taskInfo: {
      marginBottom: theme.spacing(3),
    },
    lblSmall: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    valueSmall: {
      fontSize: 12,
    },
    description: {
      borderTop: '1px solid #ddd',
      marginTop: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    isRunning: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      paddingRight: theme.spacing(1),
    },
    isOrphan: {
      background: theme.palette.warning.main,
      color: theme.palette.common.white,
      paddingRight: theme.spacing(1),
    },
    isKilled: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      background: theme.palette.error.main,
      color: theme.palette.common.white,
      paddingRight: theme.spacing(1),
    },
    isCompleted: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      background: theme.palette.success.main,
      color: theme.palette.common.white,
      paddingRight: theme.spacing(1),
    },
  };
});

const TaskDetailsHeader = ({ task }) => {
  const classes = useStyles();
  const {
    description,
    taskName,
    groupName,
    isPlanned,
    isRunning,
    isOrphan,
    isKilled,
    isCompleted,
    createdAt,
    startedAt,
    nextIteration,
    lastIteration,
    iterations,
  } = task;

  // const displayClass = (() => {
  //   if (isRunning) return classes.isRunning;
  //   if (isOrphan) return classes.isOrphan;
  //   if (isKilled) return classes.isKilled
  //   return null;
  // })();

  const displayClass = [
    ...(isRunning ? [classes.isRunning] : []),
    ...(isOrphan ? [classes.isOrphan] : []),
    ...(isKilled ? [classes.isKilled] : []),
    ...(isCompleted ? [classes.isCompleted] : []),
  ].join(' ');

  return (
    <DetailsSection>
      <Grid container alignItems="stretch">
        <Grid item xs={9}>
          <Typography variant="h4">
            <small>{groupName}/</small>
            {taskName}
          </Typography>
          <div>
            <Typography component="span" className={classes.lblSmall}>
              {'Created: '}
            </Typography>
            <DisplayDate date={createdAt} className={classes.valueSmall} />
          </div>
          <div>
            <Typography component="span" className={classes.lblSmall}>
              {'Last run: '}
            </Typography>
            <DisplayDate date={lastIteration} className={classes.valueSmall} />
          </div>
        </Grid>
        <Grid item xs={3} className={displayClass}>
          <Typography variant="h3" align="right">
            {iterations}
          </Typography>
          {(isPlanned || isRunning || isOrphan) && (
            <div style={{ textAlign: 'right' }}>
              <Typography component="span" className={classes.lblSmall}>
                {isRunning || isOrphan ? 'Started: ' : 'Runs in: '}
              </Typography>
              <DisplayDate
                date={isRunning || isOrphan ? startedAt : nextIteration}
                className={classes.valueSmall}
              />
            </div>
          )}
        </Grid>
      </Grid>
      {description && (
        <div className={classes.description}>
          <Typography>{description}</Typography>
        </div>
      )}
    </DetailsSection>
  );
};

TaskDetailsHeader.propTypes = {
  task: taskShape.isRequired,
};

export default TaskDetailsHeader;
