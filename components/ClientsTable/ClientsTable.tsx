import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Client } from '@prisma/client';
import { useGetClients } from '@/lib/actions/client';

const ClientsTable = () => {
  const getClientsQuery = useGetClients();

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
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: getClientsQuery.isLoading,
      isSaving: getClientsQuery.isLoading,
      showProgressBars: getClientsQuery.isFetching,
    },
    positionGlobalFilter: 'left',
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
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default ClientsTable;
