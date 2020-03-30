import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { taskShape } from '../../../data-types/task';
import DetailsSection from '../../../layouts/DetailsSection';
import DisplayDate from '../../DisplayDate';
import JsonViewer from '../../JsonViewer';

const useStyles = makeStyles(theme => ({
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
}));

const TaskDetails = ({ task }) => {
  const classes = useStyles();
  const {
    description,
    taskName,
    groupName,
    createdAt,
    nextIteration,
    lastIteration,
    iterations,
    payload,
  } = task;
  // console.log(task);
  return (
    <>
      <DetailsSection>
        <Grid container alignItems="center">
          <Grid item xs={6}>
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
              <DisplayDate
                date={lastIteration}
                className={classes.valueSmall}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" align="right">
              {iterations}
            </Typography>
            <div style={{ textAlign: 'right' }}>
              <Typography component="span" className={classes.lblSmall}>
                {'Runs in: '}
              </Typography>
              <DisplayDate
                date={nextIteration}
                className={classes.valueSmall}
              />
            </div>
          </Grid>
        </Grid>
        {description && (
          <div className={classes.description}>
            <Typography>{description}</Typography>
          </div>
        )}
      </DetailsSection>

      <DetailsSection title="Schedule">
        <JsonViewer json={payload.schedule} />
      </DetailsSection>

      <DetailsSection title="Action">
        <JsonViewer json={payload.action} />
      </DetailsSection>
    </>
  );
};

TaskDetails.propTypes = {
  task: taskShape.isRequired,
};

export default TaskDetails;
