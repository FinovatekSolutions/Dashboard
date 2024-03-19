import { Select } from '@mantine/core';

export function SelectClientDropdown() {
  return (
    <Select
      pt = {3}
      checkIconPosition="right"
      placeholder="Pick a Client"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'fade', duration: 200 } }}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      size='md'
    />
  );
}