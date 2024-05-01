import { Paper, Space, Center, Flex, Box, useMantineTheme } from '@mantine/core';

export function BasicPageLayoutExample() {
  const theme = useMantineTheme();

  return (
    <Center>
      <Space h="md" />
      <Paper p="xs" shadow="xs" w={{ base: '97%' }} maw={`${theme.breakpoints.lg}`}>
        <Paper h={50} p="sm" style={{ backgroundColor: 'red' }}>
          Component 0
        </Paper>
        {/* Container for the first two components */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          style={{ gap: '16px' }} // Adjust the gap size as needed
          mt={16}
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
      </Paper>
    </Center>
  );
}
