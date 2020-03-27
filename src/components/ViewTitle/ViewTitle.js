import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RoutedLink from '../RoutedLink';

const useStyles = makeStyles((theme, foo) => {
  // console.log(theme);
  return {
    wrapper: {
      marginBottom: ({ spacing }) => theme.spacing(spacing),
    },
    before: {
      display: 'flex',
      alignItems: 'center',
    },
    // after: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'flex-end',
    // },
    center: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: '2rem',
    },
    icon: {
      color: theme.palette.common.black,
    },
  };
});

const ViewTitle = ({ title, subtitle, backTo, ...props }) => {
  const classes = useStyles(props);

  return (
    <Grid container spacing={2} className={classes.wrapper}>
      {backTo && (
        <Grid item className={classes.before}>
          <RoutedLink to={backTo}>
            <ArrowBackIosIcon className={classes.icon} />
          </RoutedLink>
        </Grid>
      )}
      <Grid item className={classes.center}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" className={classes.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Grid>
      {/* <Grid item xs className={classes.after}>
        foo
      </Grid> */}
    </Grid>
  );
};

ViewTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  /**
   * Adds a "link back" icon "`<`" to the left hand side of the title
   */
  backTo: PropTypes.string,
  /**
   * Sets the lower margin of the entire component
   */
  spacing: PropTypes.number,
};

ViewTitle.defaultProps = {
  spacing: 2,
};

export default ViewTitle;
