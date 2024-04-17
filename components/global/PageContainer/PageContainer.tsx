import { Paper, Space, Center, useMantineTheme, PaperProps } from '@mantine/core';

interface PageContainerProps extends PaperProps {
  children: React.ReactNode;
}

export function PageContainer({ children, ...props }: PageContainerProps) {
  const theme = useMantineTheme();

  return (
    <>
      <Center>
        <Space h="md" />
        <Paper
          p="xs"
          w={{ base: '97%' }}
          maw={`${theme.breakpoints.lg}`}
          style={{
            backgroundColor: theme.colors['irene-dark-blue'][9],
          }}
          {...props}
        >
          {children}
        </Paper>
      </Center>
    </>
  );
}
