import { Select } from '@mantine/core';

export function SelectClientDropdown() {
  return (
    <Select
      label="Select Client"
      placeholder="Pick a Client"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}