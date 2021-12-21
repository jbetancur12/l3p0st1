import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Modal,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
import React, { useState } from 'react';
import { useTheme } from '@material-ui/styles';
import Select from 'react-select';
import plural from 'pluralize-es';
import { useStyles } from '../../utils';

export const CustomerListToolbar = ({
  search,
  filterOptions,
  selectedValue,
  setSelectedValue,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClose = (action) => () => {
    if (action === 'accept') {
      setOpen(false);
    }
    if (action === 'cancel') {
      setOpen(false);
    }
  };
  const Form = { ...rest.form, props: { handleClose } };

  const handleChange = (e, a) => {
    setSelectedValue(e.value);
  };

  return (
    <Box {...rest}>
      <Box
        alignItems='center'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        margin={theme.spacing(-1, -1)}
      >
        <Typography sx={{ m: 1 }} variant='h4'>
          {plural(rest.title) || ' List'}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Export
          </Button>
          <>
            <Button
              color='primary'
              variant='contained'
              onClick={() => setOpen(true)}
            >
              {`Agregar ${rest.title || 'List'} `}
            </Button>
            <Modal
              // disablePortal
              id='dfdf'
              open={open}
              onClose={handleClose}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
            >
              {Form}
            </Modal>
          </>
        </Box>
      </Box>
      <Box marginTop={theme.spacing(1 * 0.38)}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                onChange={search}
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
                placeholder={`Buscar ${rest.title}`}
                variant='outlined'
              />
            </Box>
            <Box maxWidth={300}>
              <br />
              <Typography variant='subtitle1' component='h2'>
                {`Buscar ${rest.title.toLowerCase()} por:`}
              </Typography>

              <Select
                instanceid='fjgflgj'
                options={filterOptions}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                onChange={handleChange}
                className={classes.selector}
                // menuColor='red'
                // styles={color}
                isSearchable
                menuPosition={'fixed'}
                placeholder={rest.title}
                // isDisabled={disable}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
