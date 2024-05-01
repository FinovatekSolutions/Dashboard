'use client';

import { useState } from 'react';
import { Button, Modal, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { NewBankTypeForm } from '../NewBankTypeForm/NewBankTypeForm';

const CreateBankTypeButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) => {
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
        Create New Bank Type
      </Button>

      <Modal
        opened={opened}
        size="xl"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={3} mb="xs">
            Create a New Bank Type
          </Title>
        }
      >
        <NewBankTypeForm setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default CreateBankTypeButton;
