'use client';

import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { notifications } from '@mantine/notifications';

import { Transaction } from '@prisma/client';
import { Menu, useMantineTheme, Text, Modal, Title, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEdit, IconTrash, IconX } from '@tabler/icons-react';

import { EditTransactionForm } from '@/components/transaction/crud/EditTransactionForm/EditTransactionForm';
import { DeleteTransactionForm } from '@/components/transaction/crud/DeleteTransactionForm/DeleteTransactionForm';
import { useGetAllTransactionsByReviewId } from '@/lib/actions/transaction';
import { formatDate, formatMoney } from '@/lib/utils/helpers';
import { TransactionWithCategory } from '@/lib/utils/types';

type TransactionsTableProps = {
  reviewId: string;
};

export const TransactionsTable = ({ reviewId }: TransactionsTableProps) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const getAllTransactionsQuery = useGetAllTransactionsByReviewId(reviewId);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState('');

  useEffect(() => {
    if (getAllTransactionsQuery.isError) {
      notifications.show({
        color: 'red',
        title: 'Failed to fetch data',
        message: 'An error occurred. Please try again later.',
        icon: <IconX size={theme.fontSizes.md} />,
        autoClose: 4000,
      });
    }
  }, [getAllTransactionsQuery.isError]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<TransactionWithCategory>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => {
          if (!row?.date) return '';
          return formatDate(row.date);
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'category.name',
        header: 'Category',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        Cell: ({ cell }) => {
          const { amount } = cell.row.original;
          const formattedMoney = formatMoney(amount);
          if (amount < 0) {
            return (
              <Badge color="red" size="lg">
                {formattedMoney}
              </Badge>
            );
          }
          if (amount > 0) {
            return (
              <Badge color="green" size="lg">
                {formattedMoney}
              </Badge>
            );
          }
          return (
            <Badge color="gray" size="lg">
              {formattedMoney}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: getAllTransactionsQuery.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
      isLoading: getAllTransactionsQuery.isLoading,
      isSaving: getAllTransactionsQuery.isLoading,
      showProgressBars: getAllTransactionsQuery.isFetching,
    },
    mantineSearchTextInputProps: {
      placeholder: `Search ${getAllTransactionsQuery?.data?.length || 0} rows`,
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
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item
          leftSection={<IconEdit />}
          onClick={() => {
            setOpenedEdit(true);
            setSelectedTransactionId(row.id);
          }}
        >
          Edit Transaction
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash color={theme.colors.red[8]} />}
          onClick={() => {
            setOpenedDelete(true);
            setSelectedTransactionId(row.id);
          }}
        >
          <Text c={theme.colors.red[8]} size="sm">
            Delete Transaction
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
            Edit Transaction
          </Title>
        }
      >
        <EditTransactionForm transactionId={selectedTransactionId} setOpened={setOpenedEdit} />
      </Modal>
      <Modal
        opened={openedDelete}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpenedDelete(false)}
        title={
          <Title order={2} mb="xs">
            Delete Transaction?
          </Title>
        }
      >
        <DeleteTransactionForm transactionId={selectedTransactionId} setOpened={setOpenedDelete} />
      </Modal>
    </>
  );
};
