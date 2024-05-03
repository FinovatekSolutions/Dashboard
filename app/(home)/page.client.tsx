'use client';

import type { ReactElement } from 'react';
import { Space } from '@mantine/core';
import HeroText from '@/components/examples/HeroText/HeroText';
import { FeaturesCards } from '@/components/examples/FeaturesCards/FeaturesCards';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

export function MainPage(): ReactElement {
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
