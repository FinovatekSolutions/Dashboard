'use client';

import { useState } from 'react';
import { Button, Modal, Group, Text, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus, IconEdit } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { EditClientForm } from '@/components/client/crud/EditClientForm/EditClientForm';

interface EditClientButtonProps extends ButtonProps {
  clientId: string;
}

const EditClientButton = ({ clientId, ...props }: EditClientButtonProps) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconEdit stroke={1.5} />}
        variant="outline"
        color={theme.colors['trust-md-light-blue'][4]}
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Edit Client
      </Button>

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
        <EditClientForm clientId={clientId} setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default EditClientButton;
