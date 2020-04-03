import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { deepInfo } from '@marcopeg/deeplog';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import { logShape } from '../../data-types/logs';
import DisplayDate from '../DisplayDate';
import DetailsSection from '../../layouts/DetailsSection';
import LogDetails from './LogDetails';

const useStyles = makeStyles(theme => ({
  table: {
    maxHeight: props => props.maxHeight,
    marginBottom: theme.spacing(2),
  },
}));

const LogsList = ({ logs, onLoadMore, onLoadNew, ...props }) => {
  const classes = useStyles(props);
  const [currentLog, setCurrentLog] = useState(null);

  const onDisclose = log => setCurrentLog(log);
  const onCloseDialog = () => setCurrentLog(null);

  const loadNewEl = (
    <Button onClick={onLoadNew}>
      <CachedIcon />
    </Button>
  );

  return (
    <DetailsSection title="Logs" floatingEl={loadNewEl}>
      <TableContainer className={classes.table}>
        <Table stickyHeader size="small">
          <TableBody>
            {logs.map(log => {
              const {
                cursor,
                createdAt,
                groupName,
                taskName,
                type,
                message,
              } = log;
              return (
                <TableRow
                  key={`${groupName}/${taskName}/${cursor}`}
                  onClick={() => onDisclose(log)}
                >
                  <TableCell>
                    <Typography variant="caption" component="div">
                      {groupName}/{taskName}
                    </Typography>
                    <DisplayDate date={createdAt} refreshInterval={5000} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{type}</Typography>
                    <Typography>{message}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={onLoadMore} color="primary" fullWidth>
            load more
          </Button>
        </Grid>
      </Grid>
      <LogDetails log={currentLog} onClose={onCloseDialog} />
    </DetailsSection>
  );
};

LogsList.propTypes = {
  logs: PropTypes.arrayOf(logShape),
  maxHeight: PropTypes.number,
  onLoadMore: PropTypes.func,
  onLoadNew: PropTypes.func,
};

LogsList.defaultProps = {
  maxHeight: 450,
  onLoadMore: null,
  onLoadNew: null,
};

export default LogsList;
