'use client';

import { useState } from 'react';
import { Button, Modal, Group, Text, ButtonProps, useMantineTheme } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { NewClientForm } from '../NewClientForm/NewClientForm';

const CreateClientButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconCirclePlus stroke={1.5} />}
        variant="light"
        color={theme.colors['trust-md-light-blue'][4]}
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Create New Client
      </Button>

      <Modal
        opened={opened}
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title="Create New Client"
      >
        <NewClientForm />
      </Modal>
    </>
  );
};

export default CreateClientButton;
