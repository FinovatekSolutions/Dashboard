'use client';

import { useEffect, useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Client, Review, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ActionIcon, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { IconEdit, IconEye, IconTrash, IconX } from '@tabler/icons-react';

import { useGetClientById, useGetClients } from '@/lib/actions/client';

const ReviewsTable = ({ clientId }: { clientId: string }) => {
  const getClientByIdQuery = useGetClientById(clientId);
  const theme = useMantineTheme();
  const router = useRouter();

  useEffect(() => {
    if (getClientByIdQuery.isError) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getClientByIdQuery.isError]);

  //should be memoized or stable
  const columns = useMemo<
    MRT_ColumnDef<
      Review & {
        user: User;
      }
    >[]
  >(
    () => [
      {
        header: 'Review Name',
        accessorKey: 'name', //access nested data with dot notation
      },
      {
        header: 'Worked By',
        accessorFn: (row) => {
          if (!row?.user) return '';
          return row.user?.name;
        },
      },
      {
        header: 'Created At',
        accessorFn: (row) => {
          if (!row?.createdAt) return '';
          const date = new Date(row.createdAt);
          return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          }).format(date);
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: getClientByIdQuery.data?.reviews || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    positionGlobalFilter: 'left',
    enableRowActions: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: getClientByIdQuery.isLoading,
      isSaving: getClientByIdQuery.isLoading,
      showProgressBars: getClientByIdQuery.isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${getClientByIdQuery?.data?.reviews?.length || 0} rows`,
      id: 'wazzapp',
      variant: 'filled',
      size: 'sm',
    },
    mantineTopToolbarProps: {
      // Ensure the toolbar spans the full width and provides space for the search input to grow
      style: { marginBottom: 5 },
    },
    mantinePaperProps: {
      shadow: 'none',
      style: { border: '0px solid #e0e0e0' },
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

export default ReviewsTable;
