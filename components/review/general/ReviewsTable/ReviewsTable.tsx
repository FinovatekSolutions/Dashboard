'use client';

import { useEffect, useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';
import clsx from 'clsx';

import { useRouter } from 'next/navigation';
import { ActionIcon, Flex, MantineProvider, Tooltip, useMantineTheme } from '@mantine/core';
import { IconEye, IconX } from '@tabler/icons-react';

import { useGetClientById } from '@/lib/actions/client';
import { useGetReviewsByUserEmail } from '@/lib/actions/review';

import { ReviewWithUser } from '@/lib/utils/types';
import { calculatePeriod, formatDate } from '@/lib/utils/helpers';

import classes from './ReviewsTable.module.css';

type ReviewsTableProps = {
  clientId?: string;
  userEmail?: string;
};

const ReviewsTable = ({ clientId, userEmail }: ReviewsTableProps) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const getClientByIdQuery = clientId ? useGetClientById(clientId) : null;
  const getReviewsByUserEmailQuery = userEmail ? useGetReviewsByUserEmail(userEmail) : null;

  const reviewsData = getClientByIdQuery?.data?.reviews || getReviewsByUserEmailQuery?.data || [];
  const isLoading = getClientByIdQuery?.isLoading || getReviewsByUserEmailQuery?.isLoading;
  const isFetching = getClientByIdQuery?.isFetching || getReviewsByUserEmailQuery?.isFetching;

  useEffect(() => {
    const error = getClientByIdQuery?.isError || getReviewsByUserEmailQuery?.isError;
    if (error) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getClientByIdQuery?.isError, getReviewsByUserEmailQuery?.isError]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ReviewWithUser>[]>(
    () => [
      {
        header: 'Review Name',
        accessorKey: 'name', //access nested data with dot notation
      },
      {
        header: 'Period',
        accessorFn: (row) => {
          if (!row?.startDate || !row?.startDate) return '';
          return calculatePeriod(row.startDate, row.endDate);
        },
      },
      {
        header: 'Author',
        accessorFn: (row) => {
          if (!row?.user) return '';
          return row.user?.name;
        },
      },
      {
        header: 'Created On',
        accessorFn: (row) => {
          if (!row?.createdAt) return '';
          return formatDate(row.createdAt);
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: reviewsData,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableFilters: false,
    enableDensityToggle: false,
    positionGlobalFilter: 'left',
    enableRowActions: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading,
      isSaving: isLoading,
      showProgressBars: isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${reviewsData?.length || 0} rows`,
      value: 'wow',
      id: 'wazzapp',
      variant: 'default',
      size: 'md',
    },
    mantineTopToolbarProps: {
      // Ensure the toolbar spans the full width and provides space for the search input to grow
      style: { marginBottom: 5 },
      className: classes.toolbars,
    },
    mantinePaperProps: {
      shadow: 'none',
      style: { border: `0px solid ${theme.colors.orange[9]}` },
      className: classes.paper,
    },
    mantineTableProps: {
      striped: true,
      withColumnBorders: true,
    },
    mantineBottomToolbarProps: { className: classes.toolbars },
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="View Review">
          <ActionIcon
            onClick={() => router.push(`/reviews/${row.id}`)}
            color={theme.colors['trust-md-light-blue'][4]}
            variant="outline"
          >
            <IconEye />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return (
    <>
      <MantineProvider theme={{ ...theme, primaryColor: 'orange' }}>
        <MantineReactTable table={table} />
      </MantineProvider>
    </>
  );
};

export default ReviewsTable;
