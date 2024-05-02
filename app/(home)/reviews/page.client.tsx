'use client';

import type { ReactElement } from 'react';
import { Title, Flex, Box, Divider, Button, useMantineTheme, Space } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

import { useGetReviews } from '@/lib/actions/review';
import { AllReviewsTable } from '@/components/review/general/AllReviewsTable/AllReviewsTable';

export function ReviewsClient(): ReactElement {
  const theme = useMantineTheme();
  const getAllReviewsQuery = useGetReviews();

  return (
    <PageContainer>
      <Title m={10} order={1}>
        All Reviews
      </Title>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}

        {/* Component 2 */}
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" />
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <AllReviewsTable />
      </Box>
    </PageContainer>
  );
}
