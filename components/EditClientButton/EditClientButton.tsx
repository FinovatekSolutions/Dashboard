'use client';

import { useState } from 'react';
import { Button, Modal, Group, Text, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus, IconEdit } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { EditClientForm } from '../EditClientForm/EditClientForm';

const EditClientButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) => {
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
        <EditClientForm setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default EditClientButton;
