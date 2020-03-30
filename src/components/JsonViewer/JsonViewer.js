import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  wrapper: {
    background: '#eee',
    padding: theme.spacing(2),
    fontFamily: 'monospace',
    fontSize: 12,
  },
}));

const JsonViewer = ({ json }) => {
  const classes = useStyles();
  const body = JSON.stringify(json, null, 2);
  return (
    <Typography component="pre" className={classes.wrapper}>
      {body}
    </Typography>
  );
};

export default React.memo(JsonViewer);
