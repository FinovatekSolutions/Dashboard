'use client';

import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Permission } from '@prisma/client';
import { ActionIcon, Flex, Modal, Tooltip, useMantineTheme, Title } from '@mantine/core';
import { IconEdit, IconTrash, IconX } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { useGetPermissions } from '@/lib/actions/permission';
import { EditPermissionForm } from '@/components/permission/crud/EditPermissionForm/EditPermissionForm';
import { DeletePermissionForm } from '@/components/permission/crud/DeletePermissionForm/DeletePermissionForm';

const PermissionsTable = () => {
  const getPermissionsQuery = useGetPermissions();
  const theme = useMantineTheme();
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [selectedPermissionId, setSelectedPermissionId] = useState('');

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
            onClick={() => {
              setOpenedEdit(true);
              setSelectedPermissionId(row.id);
            }}
            color={theme.colors['trust-md-light-blue'][4]}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Permission">
          <ActionIcon
            onClick={() => {
              setOpenedDelete(true);
              setSelectedPermissionId(row.id);
            }}
            color={theme.colors.red[6]}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />
      <Modal
        opened={openedEdit}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpenedEdit(false)}
        title={
          <Title order={3} mb="xs">
            Edit Permission
          </Title>
        }
      >
        <EditPermissionForm permissionId={selectedPermissionId} setOpened={setOpenedEdit} />
      </Modal>
      <Modal
        opened={openedDelete}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpenedDelete(false)}
        title={
          <Title order={3} mb="xs">
            Delete Permission?
          </Title>
        }
      >
        <DeletePermissionForm permissionId={selectedPermissionId} setOpened={setOpenedDelete} />
      </Modal>
    </>
  );
};

export default PermissionsTable;
