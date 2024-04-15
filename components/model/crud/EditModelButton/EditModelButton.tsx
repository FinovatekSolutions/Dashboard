'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { EditModelForm } from '@/components/model/crud/EditModelForm/EditModelForm';

interface EditModelButtonProps extends ButtonProps {
  modelId: string;
}

const EditClientButton = ({ modelId, ...props }: EditModelButtonProps) => {
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
        Edit Model
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={2} mb="xs">
            Edit Model
          </Title>
        }
      >
        <EditModelForm modelId={modelId} setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default EditClientButton;
