'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { EditTransactionForm } from '@/components/transaction/crud/EditTransactionForm/EditTransactionForm';

interface EditTransactionButtonProps extends ButtonProps {
  transactionId: string;
}

const EditTransactionButton = ({ transactionId, ...props }: EditTransactionButtonProps) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconEdit stroke={1.5} />}
        variant="outline"
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Edit Transaction
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={2} mb="xs">
            Edit Transaction
          </Title>
        }
      >
        <EditTransactionForm transactionId={transactionId} setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default EditTransactionButton;
