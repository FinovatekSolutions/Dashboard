import { useRef } from 'react';
import {
  Table,
  ActionIcon,
  Text,
  Tooltip,
  Group,
  Button,
  rem,
  useMantineTheme,
  Flex,
  Center,
} from '@mantine/core';
import { IconX, IconTrash, IconDownload } from '@tabler/icons-react';

import { useForm } from '@mantine/form';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './BankStatementsDragAndDrop.module.css';
import { SelectBankTypeDropdown } from '@/components/review/crud/SelectBankTypeDropdown/SelectBankTypeDropdown';

interface FormValues {
  files: File[];
  name: string;
  size: string;
  type: string;
}

export function BankStatementsDragAndDrop() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const form = useForm<FormValues>({ initialValues: { files: [], name: '', size: '', type: '' } });

  const selectedBankStatements = form.values.files.map((files, index) => (
    <Table.Tr key={index}>
      <Table.Td style={{ maxWidth: rem(250) }}>
        <Tooltip arrowOffset={50} arrowSize={5} withArrow position="top-start" label={files.name}>
          <Text truncate="end">{files.name}</Text>
        </Tooltip>
      </Table.Td>
      <Table.Td style={{ minWidth: rem(78) }}>
        <Text>{((files.size / 1024) * 0.001).toFixed(2)} mb</Text>
      </Table.Td>
      <Table.Td style={{ minWidth: rem(57) }}>
        <SelectBankTypeDropdown />
      </Table.Td>
      <Table.Td>
        <Center>
          <ActionIcon color="red" onClick={() => form.removeListItem('files', index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Center>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(file) => form.setFieldValue('files', file)}
          onReject={() => form.setFieldError('files', 'Select PDf or Excel Type Files only')} //change to make a fancy notification
          className={classes.dropzone}
          radius="sm"
          accept={[MIME_TYPES.pdf, MIME_TYPES.csv, MIME_TYPES.xls, MIME_TYPES.xlsx]}
          maxSize={30 * 1024 ** 2}
          style={{ borderStyle: 'dashed', borderWidth: 2, borderRadius: 10, color: 'dimgray' }}
        >
          <Group justify="center">
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconDownload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="sm">
                <Dropzone.Accept>Drop the Bank Statements</Dropzone.Accept>
                <Dropzone.Reject>
                  Incorrect file type or file size is more than 30mb{' '}
                </Dropzone.Reject>
                <Dropzone.Idle>Upload Bank Statements</Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed" pb="sm">
                Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
                <i>.pdf, .csv, .xls, .xlsx</i> files that are less than 30mb in size.
              </Text>
            </div>
            <div>
              <Button
                className={classes.control}
                size="md"
                radius="xl"
                onClick={() => openRef.current?.()}
              >
                Select files
              </Button>
            </div>
          </Group>
        </Dropzone>
      </div>
      <Text pb={1} ta="center" fw={700}>
        Selected Bank Statements
      </Text>
      <Flex style={{ height: rem(200) }}>
        <Table.ScrollContainer minWidth={500}>
          <Table striped stickyHeader highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ maxWidth: rem(250) }}>Bank Statement</Table.Th>
                <Table.Th style={{ minWidth: rem(78) }}>Size</Table.Th>
                <Table.Th style={{ minWidth: rem(57) }}>Type</Table.Th>
                <Table.Th>Delete</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{selectedBankStatements}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Flex>
    </div>
  );
}
