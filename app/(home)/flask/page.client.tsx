'use client';

import type { ReactElement } from 'react';
import { Paper, Title, Text, Loader, Center } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';

import { usePingFlaskApiQuery } from '@/lib/actions/flask';

export function FlaskClient(): ReactElement {
  const { data: pingFlaskData, isLoading, isError } = usePingFlaskApiQuery();

  if (isLoading) {
    return (
      <Center>
        <Loader pt={2} />
      </Center>
    );
  }

  if (isError || !pingFlaskData) {
    return (
      <Center>
        <IconMoodSad stroke={1} color="red" />
        <Text pl={2} c="red">Failed to load data</Text>
      </Center>
    );
  }

  // Ensure pingFlaskData is an object before attempting to map
  if (typeof pingFlaskData !== 'object' || pingFlaskData === null) {
    return <Text>Invalid data format</Text>;
  }

  return (
    <Center>
      <Paper p="md">
        <Title order={4}>Flask API Response</Title>
        {Object.entries(pingFlaskData).map(([key, value]) => (
          <Text key={key}>
            {key}: {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
          </Text>
        ))}
      </Paper>
    </Center>
  );
}
