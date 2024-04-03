'use client';

import type { ReactElement } from 'react';
import { Title, Text, Flex, Box, Divider, Button } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import PermissionsTable from '@/components/permission/general/PermissionsTable/PermissionsTable';
import CreatePermissionButton from '@/components/permission/crud/CreatePermissionButton/CreatePermissionButton';
import { useGetPermissions } from '@/lib/actions/permission';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

export function ClientsClient(): ReactElement {
  const getPermissionsQuery = useGetPermissions();

  return (
    <PageContainer>
      <Title m={10} order={1}>
        Permissions
      </Title>
      <Text ml={10} c="dimmed">
        Manage who has access to the website and their roles.
      </Text>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <CreatePermissionButton />

        {/* Component 2 */}
        <Button
          onClick={() => getPermissionsQuery.refetch()}
          leftSection={<IconRefresh size={14} />}
          variant="default"
          size="md"
        >
          Refresh
        </Button>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" />
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <PermissionsTable />
      </Box>
    </PageContainer>
  );
}
