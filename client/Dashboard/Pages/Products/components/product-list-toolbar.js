import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
import React, { useState } from 'react';
import { useTheme } from '@material-ui/styles';
import ModalButton from './ModalProduct';

export const ProductListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

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
          Productos
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Importar
          </Button>
          <Button startIcon={<DownloadIcon fontSize='small' />} sx={{ mr: 1 }}>
            Exportar
          </Button>

          <ModalButton />
        </Box>
      </Box>
      <Box marginTop={theme.spacing(1 * 0.38)}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
