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
  Skeleton,
  Group,
} from '@mantine/core';
import { IconChevronLeft, IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';

import ClientsTable from '@/components/client/general/ClientsTable/ClientsTable';
import EditClientButton from '@/components/client/crud/EditClientButton/EditClientButton';
import { useGetClients, useGetClientById } from '@/lib/actions/client';
import { ClientInfo } from '@/components/client/general/ClientInfo/ClientInfo';
import { ClientStatsSegments } from '@/components/client/general/ClientStatsSegments/ClientStatsSegments';
import ReviewsTable from '@/components/review/general/ReviewsTable/ReviewsTable';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

export function ViewReviewByIDClient({ params }: { params: { clientId: string } }) {
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
    <Skeleton visible={getClientByIdQuery.isLoading} key="myClient">
      <Text size="md" c={theme.colors['trust-md-gray'][6]}>
        {getClientByIdQuery.data?.firstName} {getClientByIdQuery.data?.lastName} (
        {getClientByIdQuery.data?.company})
      </Text>
    </Skeleton>,
  ];

  return (
    <PageContainer pos="relative">
      <LoadingOverlay
        visible={getClientByIdQuery.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs visibleFrom="xs" m={10}>
        {breadcrumbsItems}
      </Breadcrumbs>
      <Box hiddenFrom="xs" m={10} ml={0}>
        <Anchor
          href="/clients"
          size="md"
          component={Link}
          c={theme.colors['trust-md-gray'][6]}
          key="clients"
        >
          <IconChevronLeft size={15} style={{ marginRight: '5px' }} />
          View All Clients
        </Anchor>
      </Box>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <EditClientButton clientId={params.clientId} />

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
        <Skeleton visible={getClientByIdQuery.isLoading}>
          <ClientInfo clientId={params.clientId} />
        </Skeleton>

        {/* Component 2 */}
        <Skeleton visible={getClientByIdQuery.isLoading}>
          <ClientStatsSegments />
        </Skeleton>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" />
      <Skeleton visible={getClientByIdQuery.isLoading}>
        <Text fz="xl" fw={500}>
          {getClientByIdQuery.data?.firstName} {getClientByIdQuery.data?.lastName}
          &apos;s Financial Reviews
        </Text>
      </Skeleton>
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <Skeleton visible={getClientByIdQuery.isLoading}>
          <ReviewsTable clientId={params.clientId} />
        </Skeleton>
      </Box>
    </PageContainer>
  );
}
