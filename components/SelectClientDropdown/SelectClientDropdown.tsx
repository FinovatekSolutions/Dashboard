import { Select } from '@mantine/core';
import { useGetClients } from '@/lib/actions/client';
import { useState, useEffect } from 'react';

export function SelectClientDropdown() {

    const [clients, setClients] = useState<string[]>([]);
    const getClientsQuery = useGetClients();
    
    useEffect(() => {
      if (getClientsQuery.status === 'success') {
        const mappedCompany = [...getClientsQuery.data]
          .sort((a, b) => a.company.localeCompare(b.company))
          .map(clients => clients.company);
          setClients(mappedCompany);
      }
    }, [getClientsQuery.status, getClientsQuery.data]);

  return (
    <Select
      pt = {3}
      checkIconPosition="right"
      placeholder="Pick a Client"
      data={clients}
      comboboxProps={{ transitionProps: { transition: 'fade', duration: 200 } }}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      size='md'
    />
  );
}