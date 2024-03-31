'use client';

import { useState } from 'react';
import { Button, Modal, Group, Text, ButtonProps, useMantineTheme, Title } from '@mantine/core';
import { IconCirclePlus, IconEdit } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

import { EditClientForm } from '@/components/client/crud/EditClientForm/EditClientForm';
import { EditReviewForm } from '../EditReviewForm/EditReviewForm';

interface EditReviewButtonProps extends ButtonProps {
  reviewId: string;
}

const EditReviewButton = ({ reviewId, ...props }: EditReviewButtonProps) => {
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
        Edit Review
      </Button>

      <Modal
        opened={opened}
        size="md"
        centered
        fullScreen={isMobile}
        onClose={() => setOpened(false)}
        title={
          <Title order={3} mb="xs">
            Edit Review
          </Title>
        }
      >
        <EditReviewForm reviewId={reviewId} setOpened={setOpened} />
      </Modal>
    </>
  );
};

export default EditReviewButton;
