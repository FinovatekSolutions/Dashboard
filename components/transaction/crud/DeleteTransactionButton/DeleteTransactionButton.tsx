'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { DeleteTransactionForm } from '@/components/transaction/crud/DeleteTransactionForm/DeleteTransactionForm';

interface DeleteTransactionButtonProps extends ButtonProps {
  transactionId: string;
}

const DeleteTransactionButton = ({ transactionId, ...props }: DeleteTransactionButtonProps) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconTrash stroke={1.5} />}
        variant="outline"
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Delete Transaction
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={2} mb="xs">
            Delete Transaction?
          </Title>
        }
      >
        <DeleteTransactionForm transactionId={transactionId} setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default DeleteTransactionButton;
