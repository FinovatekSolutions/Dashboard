'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { NewTransactionForm } from '@/components/transaction/crud/NewTransactionForm/NewTransactionForm';

export const CreateTransactionButton = (
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconCirclePlus stroke={1.5} />}
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Create New Transaction
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={2} mb="xs">
            Create a New Transaction
          </Title>
        }
      >
        <NewTransactionForm setOpened={setOpened} />
      </Modal>
    </>
  );
};
