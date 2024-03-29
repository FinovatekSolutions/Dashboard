'use client';

import type { ReactElement } from 'react';
import {
  Center,
  Divider,
  Space,
  Title,
  useMantineTheme,
  Text,
  Flex,
  Button,
  Box,
} from '@mantine/core';

import { useSession } from 'next-auth/react';

import { IconRefresh } from '@tabler/icons-react';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';
import { UserProfile } from '@/components/user/general/UserProfile/UserProfile';
import CreateClientButton from '@/components/client/crud/CreateClientButton/CreateClientButton';
import ClientsTable from '@/components/client/general/ClientsTable/ClientsTable';
import { useGetClients } from '@/lib/actions/client';
import CreateReviewButton from '@/components/review/crud/CreateReviewButton/CreateReviewButton';
import { useGetReviewsByUserEmail } from '@/lib/actions/review';
import ReviewsTable from '@/components/review/general/ReviewsTable/ReviewsTable';

export function MyReviewsClient(): ReactElement {
  const { data: session } = useSession();
  const getReviewsByUserEmailQuery = useGetReviewsByUserEmail(session?.user?.email || '');

  return (
    <PageContainer>
      <Title m={10} order={1}>
        My Reviews
      </Title>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <CreateReviewButton />

        {/* Component 2 */}
        <Button
          onClick={() => getReviewsByUserEmailQuery.refetch()}
          leftSection={<IconRefresh size={14} />}
          variant="default"
          size="md"
        >
          Refresh
        </Button>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" />
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <ReviewsTable userEmail={session?.user?.email || ''} />
      </Box>
    </PageContainer>
  );
}
