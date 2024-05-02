'use client';

import type { ReactElement } from 'react';
import { Space, Center } from '@mantine/core';
import HeroText from '@/components/examples/HeroText/HeroText';
import { FeaturesCards } from '@/components/examples/FeaturesCards/FeaturesCards';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

export function MainPage(): ReactElement {
  return (
    <PageContainer
      withBorder={false}
      shadow="none"
      style={{
        backgroundColor: '#f8f9fa',
      }}
    >
      <Space h="md" />

      <HeroText />

      <FeaturesCards />
    </PageContainer>
  );
}
