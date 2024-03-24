'use client';

import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Permission } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ActionIcon, Flex, Modal, Tooltip, useMantineTheme, Title } from '@mantine/core';
import { IconEdit, IconX } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { useGetPermissions } from '@/lib/actions/permission';
import { EditPermissionForm } from '@/components/permission/crud/EditPermissionForm/EditPermissionForm';

const PermissionsTable = () => {
  const getPermissionsQuery = useGetPermissions();
  const theme = useMantineTheme();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    if (getPermissionsQuery.isError) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getPermissionsQuery.isError]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Permission>[]>(
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
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
      },
      {
        header: 'Role',
        accessorFn: (row) => {
          if (!row?.role) return '';
          return row.role.charAt(0) + row.role.slice(1).toLowerCase();
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: getPermissionsQuery.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    positionGlobalFilter: 'left',
    enableRowActions: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: getPermissionsQuery.isLoading,
      isSaving: getPermissionsQuery.isLoading,
      showProgressBars: getPermissionsQuery.isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${getPermissionsQuery?.data?.length || 0} rows`,
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
    mantineTableProps: {
      striped: true,
      withColumnBorders: true,
    },
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="Edit Permission">
          <ActionIcon
            onClick={() => setOpened(true)}
            color={theme.colors['trust-md-light-blue'][4]}
            variant="outline"
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Modal
          opened={opened}
          size="xl"
          centered
          fullScreen={isMobile}
          onClose={() => setOpened(false)}
          title={
            <Title order={3} mb="xs">
              Edit Client
            </Title>
          }
        >
          <EditPermissionForm permissionId={row.id} setOpened={setOpened} />
        </Modal>
      </Flex>
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default PermissionsTable;
