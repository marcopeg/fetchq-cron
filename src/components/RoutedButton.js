import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const RoutedButton = props => <Button {...props} component={RouterLink} />;

export default RoutedButton;
