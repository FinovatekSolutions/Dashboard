import { Select } from '@mantine/core';
import { useGetBankTypes } from '@/lib/actions/banktype';
import { useState } from 'react';
import { BankType } from '@prisma/client';

export function SelectBankTypeDropdown() {
  const [selectedBankType, setSelectedBankType] = useState<BankType | null>(null);
  const getBankTypesQuery = useGetBankTypes();

  // Assuming getBankTypesQuery.data is an array of BankType objects
  const bankTypeOptions =
    getBankTypesQuery.data?.map((bankType) => ({
      value: bankType.id, // Assuming each bank type has a unique ID
      label: bankType.name, // The name of the bank type to display
    })) || [];

  const handleBankTypeChange = (value: string | null) => {
    // Find the bank type object based on the selected value
    const bankTypeObj = getBankTypesQuery.data?.find((bankType) => bankType.id === value) || null;
    setSelectedBankType(bankTypeObj);
  };

  return (
    <Select
      placeholder="Pick a Bank Type"
      data={bankTypeOptions}
      value={selectedBankType?.id || ''}
      onChange={handleBankTypeChange}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      size="sm"
    />
  );
}
