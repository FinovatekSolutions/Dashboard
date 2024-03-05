'use client';

import { useEffect, useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Client } from '@prisma/client';

import { ActionIcon, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { IconEdit, IconEye, IconTrash, IconX } from '@tabler/icons-react';

import { useGetClients } from '@/lib/actions/client';
import { useRouter } from 'next/navigation';

const ClientsTable = () => {
  const getClientsQuery = useGetClients();
  const theme = useMantineTheme();
  const router = useRouter();

  useEffect(() => {
    if (getClientsQuery.isError) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getClientsQuery.isError]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: 'firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'company', //normal accessorKey
        header: 'Company',
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'zip',
        header: 'Zip',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: getClientsQuery.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    positionGlobalFilter: 'left',
    enableRowActions: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: getClientsQuery.isLoading,
      isSaving: getClientsQuery.isLoading,
      showProgressBars: getClientsQuery.isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${getClientsQuery?.data?.length || 0} rows`,
      id: 'wazzapp',
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
        <Tooltip label="View Client">
          <ActionIcon
            onClick={() => router.push(`/clients/${row.id}`)}
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

export default ClientsTable;
