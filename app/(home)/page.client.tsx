'use client';

import type { ReactElement } from 'react';
import { Space } from '@mantine/core';
import HeroText from '@/components/examples/HeroText/HeroText';
import { FeaturesCards } from '@/components/examples/FeaturesCards/FeaturesCards';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';
import { useGetBankTypes } from '@/lib/actions/banktype';
import { useGetClients } from '@/lib/actions/client';

export function MainPage(): ReactElement {
  const getBankTypesQuery = useGetBankTypes();
  const getClientQuery = useGetClients();

  return (
    <PageContainer
      shadow="none"
      mb="sm"
      p="md"
      style={{
        backgroundColor: 'white',
      }}
    >
      <Space h="md" />

      <HeroText />

      <FeaturesCards />
    </PageContainer>
  );
}
