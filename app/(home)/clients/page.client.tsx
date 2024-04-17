'use client';

import type { ReactElement } from 'react';
import { Title, Flex, Box, Divider, Button, useMantineTheme } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import ClientsTable from '@/components/client/general/ClientsTable/ClientsTable';
import CreateClientButton from '@/components/client/crud/CreateClientButton/CreateClientButton';
import { useGetClients } from '@/lib/actions/client';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

export function ClientsClient(): ReactElement {
  const theme = useMantineTheme();
  const getClientsQuery = useGetClients();

  return (
    <PageContainer>
      <Title m={10} order={1} c="white">
        Clients
      </Title>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <CreateClientButton />

        {/* Component 2 */}
        <Button
          onClick={() => getClientsQuery.refetch()}
          leftSection={<IconRefresh size={14} />}
          size="md"
          variant="outline"
          color="white"
        >
          Refresh
        </Button>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" color={theme.colors.dark[3]} />
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <ClientsTable />
      </Box>
    </PageContainer>
  );
}
