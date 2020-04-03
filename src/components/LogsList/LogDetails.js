import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { logShape } from '../../data-types/logs';
import JsonViewer from '../JsonViewer';

const LogDetails = ({ log, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(log !== null);
  }, [log, setIsOpen]);

  const handleClose = evt => {
    setIsOpen(false);
    onClose && onClose(evt);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Log Details:</DialogTitle>

      <DialogContent>
        <JsonViewer json={log} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LogDetails.propTypes = {
  log: logShape,
  onClose: PropTypes.func,
};

LogDetails.defaultProps = {
  log: null,
  onClose: null,
};

export default LogDetails;
