import { Box, Container, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { listProviders } from '../../../core/api-providers';
import { ProviderListToolbar } from './components/provider-list-toolbar';
import { ProviderListResults } from './components/Providers-list-results';

function Providers() {
  const theme = useTheme();
  const [providers, setProviders] = useState([]);
  useEffect(async () => {
    const _providers = await listProviders();
    console.log(_providers);
    setProviders(_providers);
  }, []);
  return (
    <>
      <Box
        component='main'
        flexGrow={1}
        paddingBottom={theme.spacing(1)}
        paddingTop={theme.spacing(1)}
      >
        <Container maxWidth={false}>
          <ProviderListToolbar />
          <Box marginTop={theme.spacing(1 * 0.38)}>
            <ProviderListResults providers={providers} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Providers;
