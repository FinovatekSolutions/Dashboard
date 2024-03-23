import { Select } from '@mantine/core';
import { useState } from 'react';
import { Client } from '@prisma/client';
import { useGetClients } from '@/lib/actions/client';

export function SelectClientDropdown() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const getClientQuery = useGetClients();

  // Assuming getClientQuery.data is an array of Client objects
  const clientOptions =
    getClientQuery.data
      ?.sort((a, b) => a.company.localeCompare(b.company)) // Sort alphabetically by company
      .map((localClient) => ({
        value: localClient.id, // Assuming each client has a unique ID
        label: localClient.company, // The name of the client to display
      })) || [];

  const handleClientChange = (value: string | null) => {
    // Find the client object based on the selected value
    const clientObj = getClientQuery.data?.find((localClient) => localClient.id === value) || null;
    setSelectedClient(clientObj);
  };

  return (
    <Select
      placeholder="Pick a Client"
      data={clientOptions}
      value={selectedClient?.id || ''}
      onChange={handleClientChange}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      size="sm"
    />
  );
}
