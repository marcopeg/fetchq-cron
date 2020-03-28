import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ErrorsList from '../../ErrorsList';
import { errors as errorsType } from '../../../data-types/errors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorsDialog = ({ errors, title, dismissable, dismissLlb, children }) => {
  const [localErrors, setLocalErrors] = useState(errors);
  const isOpen = localErrors && localErrors.length;

  useEffect(() => {
    setLocalErrors(errors);
  }, [errors, setLocalErrors]);

  const handleDismiss = () => setLocalErrors(null);

  return (
    <Dialog
      keepMounted
      open={isOpen}
      TransitionComponent={Transition}
      onClose={dismissable ? handleDismiss : null}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {children && <DialogContentText>{children}</DialogContentText>}
        {errors && <ErrorsList errors={errors} />}
      </DialogContent>
      {dismissable && (
        <DialogActions>
          <Button onClick={handleDismiss} color="primary">
            {dismissLlb}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

ErrorsDialog.propTypes = {
  errors: errorsType,
  title: PropTypes.string,
  dismissable: PropTypes.bool,
  /**
   * Customize the dismiss button
   */
  dismissLlb: PropTypes.string,
  /**
   * Pass any kind of content to show it before the errors list
   */
  children: PropTypes.any,
};

ErrorsDialog.defaultProps = {
  errors: null,
  title: null,
  dismissable: true,
  dismissLlb: 'Ok',
  children: null,
};

export default ErrorsDialog;
