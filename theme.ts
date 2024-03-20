'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  breakpoints: {
    xs: '30em',
    sm: '51em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  colors: {
    'trust-md-dark-blue': [
      '#e4fbff',
      '#d1f4fd',
      '#a4e8fa',
      '#74dbf7',
      '#51d1f4',
      '#3fcaf3',
      '#31c7f4',
      '#22b0da',
      '#079cc3', // 8, main theme color
      '#0088ac',
    ],
    'trust-md-light-blue': [
      '#defcff',
      '#caf2ff',
      '#9be2fd',
      '#67d1fa',
      '#3dc3f8', // 4, main theme color
      '#20baf7',
      '#00b6f7',
      '#009fdd',
      '#008ec7',
      '#007bb0',
    ],
    'trust-md-gray': [
      '#fbf3f5',
      '#e7e7e8', // 1, main theme color
      '#cccccc',
      '#b0b0b0',
      '#999999',
      '#898989',
      '#828283',
      '#6f6f71',
      '#636366',
      '#55555c',
    ],
    'trust-md-white': [
      '#ffffeb', // 0, main theme color
      '#ffffd5',
      '#fffea5',
      '#fffe70',
      '#fffe49',
      '#fffe36',
      '#fffe2d',
      '#e4e322',
      '#c9c918',
      '#adad00',
    ],
    'trust-md-light-green': [
      '#f3fce7',
      '#e9f6d7',
      '#d3eab0',
      '#bade85',
      '#a7d461',
      '#99ce4a',
      '#92cb3d', // 6, main theme color
      '#7db32e',
      '#6e9f26',
      '#5c8a19',
    ],
    'trust-md-dark-green': [
      '#e8fef3',
      '#d6f8e8',
      '#adf0d1',
      '#7fe8b6',
      '#5ce2a1',
      '#45dd93',
      '#38db8c',
      '#29c378',
      '#1cad69', // 8, main theme color
      '#009659',
    ],
    'trust-md-black': [
      '#f3f3f7',
      '#e4e4e7',
      '#c5c6cf',
      '#a4a7b8',
      '#898ca4',
      '#777b9a',
      '#6f7395',
      '#5d6281',
      '#535775',
      '#454b68', // 9, main theme color
    ],
  },
});
