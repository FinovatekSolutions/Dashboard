'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { NewClientForm } from '@/components/client/crud/NewClientForm/NewClientForm';

const CreateEventButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconCirclePlus stroke={1.5} />}
        variant="outline"
        color={theme.colors['irene-orange'][4]}
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Create New Client
      </Button>

      <Modal
        opened={opened}
        size="xl"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={3} mb="xs">
            Create a New Client
          </Title>
        }
      >
        <NewClientForm setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default CreateEventButton;
