import { Select } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Client } from '@prisma/client';
import { useGetClients } from '@/lib/actions/client';

interface SelectClientDropdownProps {
  onSelectClient: (client: Client | null) => void;
}

export function SelectClientDropdown() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const getClientQuery = useGetClients();

  // State to hold the sorted clients
  const [sortedClients, setSortedClients] = useState<Client[]>([]);

  // Use useEffect to sort the clients once the getClientQuery data is available or changed
  useEffect(() => {
    if (getClientQuery.data) {
      const sortedData = [...getClientQuery.data].sort((a, b) =>
        a.company.localeCompare(b.company)
      );
      setSortedClients(sortedData);
    }
  }, [getClientQuery.data]);

  // Map the sorted clients to Select options
  const clientOptions = sortedClients.map((localClient) => ({
    value: localClient.id, // Assuming each client has a unique ID
    label: localClient.company, // The name of the client to display
  }));

  const handleClientChange = (value: string | null) => {
    // Find the client object based on the selected value from the sorted clients
    const clientObj = sortedClients.find((localClient) => localClient.id === value) || null;
    setSelectedClient(clientObj);
  };

  return (
    <Select
      placeholder="Client"
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
