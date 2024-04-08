import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { Box, rem, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function HomeSearchInput() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const handleSubmit = async (values: { search: string }) => {
    router.push(`/browse?query=${encodeURIComponent(values.search)}`); // Use the router to navigate
  };

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%" maw={600}>
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Search the database"
        placeholder="Cambio a Placas Solares en Módulos Escolares"
        {...form.getInputProps('search')}
        styles={{
          label: {
            color: 'white', // Sets the label text color to white
          },
        }}
      />
    </Box>
  );
}
