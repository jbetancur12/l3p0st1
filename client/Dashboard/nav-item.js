import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawerPape: {
    backgroundColor: '#111827',
    color: '#FFFFFF',
    width: 280,
  },
}));

export const NavItem = withRouter((props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { href, icon, title, history, ...others } = props;
  const active = (history, path) => history.location.pathname == path;
  return (
    <ListItem
      disableGutters
      style={{
        display: 'block',
        marginBottom: theme.spacing(0.5),
        padding: theme.spacing(0, 2),
      }}
      {...others}
    >
      <Link to={href}>
        <Button
          component='a'
          startIcon={icon}
          disableRipple
          style={{
            backgroundColor: active(history, href) && 'rgba(255,255,255, 0.08)',
            borderRadius: theme.spacing(1),
            color: active(history, href) ? '#10B981' : '#D1D5DB',
            fontWeight: active(history, href) && '600',
            justifyContent: 'flex-start',
            paddingLeft: theme.spacing(3),
            paddingRigth: theme.spacing(3),
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active(history, href) ? '#10B981' : '#9CA3AF',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box flexGrow={1}>{title}</Box>
        </Button>
      </Link>
    </ListItem>
  );
});

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
