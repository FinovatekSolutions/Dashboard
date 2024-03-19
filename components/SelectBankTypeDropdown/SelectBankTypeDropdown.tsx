import { Select } from '@mantine/core';
import { useGetBankTypes } from '@/lib/actions/banktype';
import { useState, useEffect } from 'react';
import { BankType } from '@prisma/client';

export function SelectBankTypeDropdown() {
  const [bankTypes, setBankTypes] = useState<string[]>([]);
  const getBankTypesQuery = useGetBankTypes();
  
  useEffect(() => {
    if (getBankTypesQuery.status === 'success') {
      const mappedNames = [...getBankTypesQuery.data]
        .map(bankType => bankType.name);
      setBankTypes(mappedNames);
    }
  }, [getBankTypesQuery.status, getBankTypesQuery.data]);

  return (
    <Select 
      pt = {3}
      checkIconPosition="right"
      placeholder="Pick a Bank Type"
      data={bankTypes}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      size='sm'
    />
  );
}
