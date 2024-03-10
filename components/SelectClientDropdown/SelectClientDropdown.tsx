import { Select } from '@mantine/core';

export function SelectClientDropdown() {
  return (
    <Select
      pt = {3}
      placeholder="Pick a Client"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
      size='md'
    />
  );
}