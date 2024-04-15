'use client';

import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Model } from '@prisma/client';
import { Menu, useMantineTheme, Text, Modal, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEdit, IconTrash, IconX } from '@tabler/icons-react';

import { EditModelForm } from '@/components/model/crud/EditModelForm/EditModelForm';
import { DeleteModelForm } from '@/components/model/crud/DeleteModelForm/DeleteModelForm';
import { useGetAllModels } from '@/lib/actions/model';
import { formatDate } from '@/lib/utils/helpers';

export const ModelsTable = () => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const getAllModelsQuery = useGetAllModels();
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('');

  useEffect(() => {
    if (getAllModelsQuery.isError) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getAllModelsQuery.isError]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Model>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
      },
      {
        header: 'Created On',
        accessorFn: (row) => {
          if (!row?.createdAt) return '';
          return formatDate(row.createdAt);
        },
      },
      {
        header: 'Updated On',
        accessorFn: (row) => {
          if (!row?.updatedAt) return '';
          return formatDate(row.createdAt);
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: getAllModelsQuery.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
      isLoading: getAllModelsQuery.isLoading,
      isSaving: getAllModelsQuery.isLoading,
      showProgressBars: getAllModelsQuery.isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${getAllModelsQuery?.data?.length || 0} rows`,
      id: 'wazzapp',
      variant: 'filled',
      size: 'sm',
    },
    mantineTopToolbarProps: {
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

    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item
          leftSection={<IconEdit />}
          onClick={() => {
            setOpenedEdit(true);
            setSelectedModelId(row.id);
          }}
        >
          Edit Model
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash color={theme.colors.red[8]} />}
          onClick={() => {
            setOpenedDelete(true);
            setSelectedModelId(row.id);
          }}
        >
          <Text c={theme.colors.red[8]} size="sm">
            Delete Model
          </Text>
        </Menu.Item>
      </>
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
          <Title order={2} mb="xs">
            Edit Model
          </Title>
        }
      >
        <EditModelForm modelId={selectedModelId} setOpened={setOpenedEdit} />
      </Modal>
      <Modal
        opened={openedDelete}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpenedDelete(false)}
        title={
          <Title order={2} mb="xs">
            Delete Model?
          </Title>
        }
      >
        <DeleteModelForm modelId={selectedModelId} setOpened={setOpenedDelete} />
      </Modal>
    </>
  );
};
