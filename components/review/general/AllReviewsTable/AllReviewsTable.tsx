'use client';

import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Review } from '@prisma/client';
import {
  Menu,
  useMantineTheme,
  Text,
  Modal,
  Title,
  Flex,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEdit, IconEye, IconTrash, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { EditReviewForm } from '@/components/review/crud/EditReviewForm/EditReviewForm';
import { useGetReviews } from '@/lib/actions/review';
import { ReviewWithUser } from '@/lib/utils/types';
import { calculatePeriod, formatDate } from '@/lib/utils/helpers';

export const AllReviewsTable = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const getAllReviewsQuery = useGetReviews();
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (getAllReviewsQuery.isError) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getAllReviewsQuery.isError]);

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
    data: getAllReviewsQuery.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    positionGlobalFilter: 'left',
    enableRowActions: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-actions'],
      },
    },
    state: {
      isLoading: getAllReviewsQuery.isLoading,
      isSaving: getAllReviewsQuery.isLoading,
      showProgressBars: getAllReviewsQuery.isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${getAllReviewsQuery?.data?.length || 0} rows`,
      variant: 'filled',
      size: 'sm',
    },
    mantineTopToolbarProps: {
      style: { marginBottom: 0 },
    },
    mantinePaperProps: {
      shadow: 'none',
      style: { border: '0px solid #e0e0e0' },
    },
    mantineTableProps: {
      striped: true,
      withColumnBorders: true,
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Actions',
        size: 20,
        grow: false,
      },
    },
    paginationDisplayMode: 'pages',
    mantinePaginationProps: {
      radius: 'sm',
      size: 'md',
    },
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
      <MantineReactTable table={table} />
    </>
  );
};
