import { Select } from '@mantine/core';

export function SelectBankTypeDropdown() {
  return (
    <Select
      label="Select Bank Type"
      placeholder="Pick a Bank Type"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}
