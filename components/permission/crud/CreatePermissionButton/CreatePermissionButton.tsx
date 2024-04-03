'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { NewPermissionForm } from '@/components/permission/crud/NewPermissionForm/NewPermissionForm';

const CreatePermissionButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      <Button
        rightSection={<IconCirclePlus stroke={1.5} />}
        variant="light"
        color={theme.colors['trust-md-light-blue'][8]}
        size="md"
        onClick={() => setOpened(true)}
        {...props}
      >
        Create New Permission
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={3} mb="xs">
            Create a new Permission
          </Title>
        }
      >
        <NewPermissionForm setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default CreatePermissionButton;
