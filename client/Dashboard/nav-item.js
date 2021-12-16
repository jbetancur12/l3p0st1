import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@material-ui/core';
import React from 'react';


export const NavItem = withRouter((props) => {
  const { href, icon, title, history, ...others } = props;
  const active = (history, path) => history.location.pathname == path
  console.log(active(history, href));
  return (
    <ListItem
      disableGutters
      style={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Link to={href} >
        <Button
          component='a'
          startIcon={icon}
          disableRipple
          style={{
            backgroundColor: active(history, href) && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active(history, href) ? 'secondary.main' : 'neutral.300',
            fontWeight: active(history, href) && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active(history, href) ? 'secondary.main' : 'neutral.400',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box style={{ flexGrow: 1 }}>{title}</Box>
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
