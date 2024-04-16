'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { DeleteModelForm } from '@/components/model/crud/DeleteModelForm/DeleteModelForm';

interface DeleteModelButtonProps extends ButtonProps {
  modelId: string;
}

const DeleteModelButton = ({ modelId, ...props }: DeleteModelButtonProps) => {
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
        Delete Model
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={2} mb="xs">
            Delete Model?
          </Title>
        }
      >
        <DeleteModelForm modelId={modelId} setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default DeleteModelButton;
