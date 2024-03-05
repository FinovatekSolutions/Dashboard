import { Select } from '@mantine/core';

export function SelectBankTypeDropdown() {
  return (
    <Select 
      pt = {3}
      placeholder="Pick a Bank Type"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      searchable
    />
  );
}
