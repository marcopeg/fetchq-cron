import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import ConfigSchedule from '../ConfigSchedule';
import ConfigRestRequest from '../ConfigRestRequest';
import JsonEditor from '../JsonEditor';

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
}));

const ConfigTask = ({ value, onChange }) => {
  const classes = useStyles();

  const onChangeProp = prop => evt => {
    onChange(evt, {
      ...value,
      [prop]: evt.target.value,
    });
  };

  const onChangeSchedule = (evt, schedule) => {
    onChange(evt, {
      ...value,
      schedule,
    });
  };

  const onChangePayload = (evt, payload) => {
    onChange(evt, {
      ...value,
      payload,
    });
  };

  const onChangeRequest = (evt, request) => {
    onChange(evt, {
      ...value,
      action: {
        ...value.action,
        request: {
          ...value.action.request,
          ...request,
        },
      },
    });
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="button">General:</Typography>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            required
            label="Group:"
            value={value.group_name}
            onChange={onChangeProp('group_name')}
          />
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            required
            label="Name:"
            value={value.task_name}
            onChange={onChangeProp('task_name')}
          />
        </FormControl>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="button">Schedule:</Typography>
        <ConfigSchedule value={value.schedule} onChange={onChangeSchedule} />
      </Paper>
      <Paper className={classes.paper}>
        <ConfigRestRequest
          value={value.action.request}
          onChange={onChangeRequest}
        />
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="button">Payload:</Typography>
        <JsonEditor value={value.payload} onChange={onChangePayload} />
      </Paper>
    </div>
  );
};

export default ConfigTask;
