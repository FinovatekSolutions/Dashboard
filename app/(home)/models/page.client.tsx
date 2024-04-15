'use client';

import type { ReactElement } from 'react';
import { Title, Flex, Box, Divider, Button, useMantineTheme } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

import { CreateModelButton } from '@/components/model/crud/NewModelButton/NewModelButton';
import { useGetAllModels } from '@/lib/actions/model';
import { ModelsTable } from '@/components/model/general/ModelsTable/ModelsTable';

export function ModelsClient(): ReactElement {
  const theme = useMantineTheme();
  const getAllModelsQuery = useGetAllModels();

  return (
    <PageContainer>
      <Title m={10} order={1} c="white">
        Models
      </Title>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <CreateModelButton />

        {/* Component 2 */}
        <Button
          onClick={() => getAllModelsQuery.refetch()}
          leftSection={<IconRefresh size={14} />}
          size="md"
          variant="default"
        >
          Refresh
        </Button>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" color={theme.colors.dark[3]} />
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <ModelsTable />
      </Box>
    </PageContainer>
  );
}
