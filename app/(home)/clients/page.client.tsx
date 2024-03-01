'use client';

import type { ReactElement } from 'react';
import { Paper, Title, Text, Center, Flex, Box, useMantineTheme } from '@mantine/core';

export function ClientsClient(): ReactElement {
  const theme = useMantineTheme();

  return (
    <Center>
      <Box w={{ base: '95%' }} maw={`${theme.breakpoints.lg}`}>
        {/* Container for the first two components */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          style={{ gap: '16px' }} // Adjust the gap size as needed
        >
          {/* Component 1 */}
          <Paper style={{ flex: 1, height: '100px', backgroundColor: 'cyan' }} p="md">
            Component 1
          </Paper>

          {/* Component 2 */}
          <Paper style={{ flex: 1, height: '100px', backgroundColor: 'magenta' }} p="md">
            Component 2
          </Paper>
        </Flex>

        {/* Component 3 - Always below the first two */}
        <Box style={{ marginTop: '16px' }}>
          {' '}
          {/* Adjust the margin as needed */}
          <Paper style={{ height: '100px', backgroundColor: 'yellow' }} p="md">
            Component 3
          </Paper>
        </Box>
      </Box>
    </Center>
  );
}
