import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';

const RoutedFab = props => <Fab {...props} component={RouterLink} />;

export default RoutedFab;
