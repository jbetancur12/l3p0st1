import React, { useEffect } from 'react';
import { read } from '../../../../core/api-roles';
import {
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useStyles } from '../../../utils';
import NumberFormat from 'react-number-format';


function Role(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [role, setRole] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  const handleClick = () => {
    setOpen(!open);
  };



  React.useEffect(async () => {
    const _role = await read(props.match.params.id);
    setRole(_role);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          padding: '100px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <TextField
          id='name'
          label='Nombre'
          className={classes.textField}
          value={role.name}
          margin='normal'
          InputProps={{
            readOnly: true,
          }}
        />
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          className={classes.root}
        >
          <ListItem button onClick={handleClick}>
            <ListItemText primary='Usuarios' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemText primary="Starred" /> */}
                {role.users.length >= 1 &&
                  role.users.map((user) => (
                    <ListItemText primary={user.name} />
                  ))}
              </ListItem>
            </List>
          </Collapse>
        </List>



        {/* {role.roles.length > 1 &&
          role.roles.map((role) => (
            <Chip size='small' label={role.name} />
          ))} */}
        <br />
      </CardContent>
    </Card>
  );
}

export default Role;
