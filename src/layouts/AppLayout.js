import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  content: {
    margin: theme.spacing(3),
  },
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>Fetchq CRON</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default AppLayout;
