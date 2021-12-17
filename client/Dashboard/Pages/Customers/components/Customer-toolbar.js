import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
import React from 'react';
import { useTheme } from '@material-ui/styles';
import Select from 'react-select';
import { useStyles } from '../../../utils';

export const CustomerListToolbar = (props) => {
  const classes = useStyles()
  const theme = useTheme();
  const handleChange = (event) => {
    props.setSelectedValue(event.target.value);
  };



  return (
    <Box {...props}>
      <Box
        alignItems='center'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        margin={theme.spacing(-1, -1)}
      >
        <Typography sx={{ m: 1 }} variant='h4'>
          Customers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color='primary' variant='contained'>
            Add Customers
          </Button>
        </Box>
      </Box>
      <Box marginTop={theme.spacing(1 * 0.38)}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                onChange={props.search}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SvgIcon color='action' fontSize='small'>
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder='Search customer'
                variant='outlined'
              />
            </Box>
            <Box maxWidth={300}>
              <Typography variant='subtitle1' component='h2'>
                Buscar por:
              </Typography>
              <br />
              <Select
                options={props.filterOptions}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                // onChange={handleChange('provider')}
                className={classes.selector}
                // menuColor='red'
                // styles={color}
                isSearchable
                menuPosition={'fixed'}
                placeholder='Medio'
              // isDisabled={disable}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
