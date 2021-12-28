import React, { useEffect } from 'react';
import { read } from '../../../../core/api-categories';
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative='false'
    />
  );
}

function Category(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  const handleClick = () => {
    setOpen(!open);
  };



  React.useEffect(async () => {
    const _category = await read(props.match.params.id);
    setCategory(_category);
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
          value={category.name}
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
            <ListItemText primary='Medios' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemText primary="Starred" /> */}
                {category.providers.length >= 1 &&
                  category.providers.map((provider) => (
                    <ListItemText primary={provider.name} />
                  ))}
              </ListItem>
            </List>
          </Collapse>
        </List>



        {/* {category.categorys.length > 1 &&
          category.categorys.map((category) => (
            <Chip size='small' label={category.name} />
          ))} */}
        <br />
      </CardContent>
    </Card>
  );
}

export default Category;
