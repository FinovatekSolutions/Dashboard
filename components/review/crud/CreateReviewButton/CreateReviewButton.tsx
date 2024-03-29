'use client';

import { Button, ButtonProps, useMantineTheme } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import Link from 'next/link';

const CreateReviewButton = (props: ButtonProps) => {
  const theme = useMantineTheme();

  return (
    <>
      <Button
        rightSection={<IconCirclePlus stroke={1.5} />}
        variant="light"
        color={theme.colors['trust-md-light-blue'][4]}
        size="md"
        href="/"
        component={Link}
        {...props}
      >
        Create New Review
      </Button>
    </>
  );
};

export default CreateReviewButton;
