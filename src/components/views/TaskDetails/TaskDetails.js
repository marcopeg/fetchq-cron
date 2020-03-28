import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { taskShape } from '../../../data-types/task';
import DetailsSection from '../../../layouts/DetailsSection';
import DisplayDate from '../../DisplayDate';

const useStyles = makeStyles(theme => ({
  taskInfo: {
    marginBottom: theme.spacing(3),
  },
}));

const TaskDetails = ({ task }) => {
  const classes = useStyles();
  const {
    taskName,
    groupName,
    nextIteration,
    lastIteration,
    iterations,
  } = task;
  console.log(task);
  return (
    <>
      <DetailsSection title="General">
        <Grid container className={classes.taskInfo}>
          <Grid item xs={6}>
            <Typography variant="caption">{'Name: '}</Typography>
            <Typography>
              <small>{groupName}/</small>
              {taskName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">{'Next Iteration: '}</Typography>
            <DisplayDate date={nextIteration} component="div" />
          </Grid>
        </Grid>
        <Grid container className={classes.taskInfo}>
          <Grid item xs={6}>
            <Typography variant="caption">{'Iterations: '}</Typography>
            <Typography>{iterations}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">{'Last Iteration: '}</Typography>
            <DisplayDate date={lastIteration} component="div" />
          </Grid>
        </Grid>
      </DetailsSection>
    </>
  );
};

TaskDetails.propTypes = {
  task: taskShape.isRequired,
};

export default TaskDetails;
