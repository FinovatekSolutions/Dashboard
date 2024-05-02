'use client';

import {
  Text,
  Flex,
  Box,
  useMantineTheme,
  Divider,
  Button,
  Anchor,
  Breadcrumbs,
  LoadingOverlay,
  Skeleton,
  Loader,
  Center,
  Stack,
  Space,
} from '@mantine/core';
import { IconArrowLeft, IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReviewStatus } from '@prisma/client';

import { ClientStatsSegments } from '@/components/client/general/ClientStatsSegments/ClientStatsSegments';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';
import { useGetReviewById } from '@/lib/actions/review';
import EditReviewButton from '@/components/review/crud/EditReviewButton/EditReviewButton';
import { ReviewInfo } from '@/components/review/general/ReviewInfo/ReviewInfo';
import { TransactionsTable } from '@/components/transaction/general/TransactionsTable/TransactionsTable';

export function ViewReviewByIDClient({ params }: { params: { reviewId: string } }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const getReviewByIdQuery = useGetReviewById(params.reviewId);

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
    <Skeleton visible={getReviewByIdQuery.isLoading} key="myClient" w="fit-content">
      <Anchor
        href={`/clients/${getReviewByIdQuery.data?.client?.id}`}
        component={Link}
        size="md"
        c={theme.colors['trust-md-gray'][6]}
      >
        {getReviewByIdQuery.data?.client?.firstName} {getReviewByIdQuery.data?.client?.lastName} (
        {getReviewByIdQuery.data?.client?.company})
      </Anchor>
    </Skeleton>,
    <Skeleton visible={getReviewByIdQuery.isLoading} key="myReview">
      <Text size="md" c={theme.colors['trust-md-gray'][6]}>
        {getReviewByIdQuery.data?.name}
      </Text>
    </Skeleton>,
  ];

  return (
    <PageContainer pos="relative">
      <LoadingOverlay
        visible={getReviewByIdQuery.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Breadcrumbs visibleFrom="xs" m={10}>
        {breadcrumbsItems}
      </Breadcrumbs>
      <Box hiddenFrom="xs" m={10} ml={0}>
        <Button
          color={theme.colors['trust-md-gray'][6]}
          leftSection={<IconArrowLeft size={14} />}
          variant="transparent"
          size="md"
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </Box>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <EditReviewButton reviewId={params.reviewId} />

        {/* Component 2 */}
        <Button
          onClick={() => getReviewByIdQuery.refetch()}
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
        <Skeleton visible={getReviewByIdQuery.isLoading}>
          <ReviewInfo reviewId={params.reviewId} />
        </Skeleton>

        {/* Component 2 */}
        <Skeleton visible={getReviewByIdQuery.isLoading}>
          <ClientStatsSegments />
        </Skeleton>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" />
      <Skeleton visible={getReviewByIdQuery.isLoading}>
        <Text fz="xl" fw={500}>
          {getReviewByIdQuery.data?.name} Transactions
        </Text>
      </Skeleton>
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <Skeleton visible={getReviewByIdQuery.isLoading}>
          {getReviewByIdQuery.data?.status === ReviewStatus.Pending ? (
            <Center>
              <Stack align="center" justify="center">
                <Space />
                <Loader />
                <Text>Pending...</Text>
                <Space />
              </Stack>
            </Center>
          ) : (
            <TransactionsTable reviewId={params.reviewId} />
          )}
        </Skeleton>
      </Box>
    </PageContainer>
  );
}
