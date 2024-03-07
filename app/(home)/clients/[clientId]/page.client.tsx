'use client';

import type { ReactElement } from 'react';
import {
  Paper,
  Title,
  Text,
  Space,
  Center,
  Flex,
  Box,
  useMantineTheme,
  Divider,
  Button,
  Anchor,
  Breadcrumbs,
  LoadingOverlay,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';

import ClientsTable from '@/components/ClientsTable/ClientsTable';
import EditClientButton from '@/components/EditClientButton/EditClientButton';
import { useGetClients, useGetClientById } from '@/lib/actions/client';
import { ClientInfo } from '@/components/ClientInfo/ClientInfo';
import { StatsSegments } from '@/components/StatsSegments.tsx/StatsSegments';

export function ViewClientByIDClient({ params }: { params: { clientId: string } }) {
  const theme = useMantineTheme();
  const getClientsQuery = useGetClients();
  const getClientByIdQuery = useGetClientById(params.clientId);

  const breadcrumbsItems = [
    <Anchor
      href="/clients"
      size="md"
      component={Link}
      c={theme.colors['trust-md-gray'][6]}
      key="clients"
    >
      Clients
    </Anchor>,
    <Text size="md" c={theme.colors['trust-md-gray'][6]} key="myClient">
      {getClientByIdQuery.data?.firstName} {getClientByIdQuery.data?.lastName} (
      {getClientByIdQuery.data?.company})
    </Text>,
  ];

  return (
    <Center pos="relative">
      <LoadingOverlay
        visible={getClientByIdQuery.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Space h="md" />
      <Paper p="xs" shadow="xs" w={{ base: '97%' }} maw={`${theme.breakpoints.lg}`}>
        <Breadcrumbs m={10}>{breadcrumbsItems}</Breadcrumbs>

        {/* Container for the first two components */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          style={{ gap: '16px' }} // Adjust the gap size as needed
          mt={16}
        >
          {/* Component 1 */}
          <EditClientButton />

          {/* Component 2 */}
          <Button
            onClick={() => getClientByIdQuery.refetch()}
            leftSection={<IconRefresh size={14} />}
            variant="default"
            size="md"
          >
            Refresh
          </Button>
        </Flex>
        <Divider my="md" />
        {/* Container for the second two components */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          style={{ gap: '16px' }} // Adjust the gap size as needed
          mt={16}
        >
          {/* Component 1 */}
          <ClientInfo clientId={params.clientId} />

          {/* Component 2 */}
          <StatsSegments />
        </Flex>

        {/* Component 3 - Always below the first two */}
        <Divider my="md" />
        <Text fz="xl" fw={500}>
          {getClientByIdQuery.data?.firstName} {getClientByIdQuery.data?.lastName}
          &apos;s Financial Reviews
        </Text>
        <Box style={{ marginTop: '16px' }}>
          {/* Adjust the margin as needed */}
          <ClientsTable />
        </Box>
      </Paper>
    </Center>
  );
}
