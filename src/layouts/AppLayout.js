import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ViewTitle from '../components/ViewTitle';

const useStyles = makeStyles(theme => ({
  content: {
    margin: theme.spacing(3),
  },
}));

const AppLayout = ({ children, titleProps }) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      {titleProps && <ViewTitle {...titleProps} />}
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  /**
   * Properties to setup a ViewTitle component
   */
  titleProps: PropTypes.object,
};

export default AppLayout;
