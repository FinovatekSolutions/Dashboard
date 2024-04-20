import { useRef, useState } from 'react';
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
  Code,
  Center,
} from '@mantine/core';
import { IconX, IconTrash, IconDownload } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './BankStatementsDragAndDrop.module.css';
import { SelectBankTypeDropdown } from '@/components/review/crud/SelectBankTypeDropdown/SelectBankTypeDropdown';
import { BankType } from '@prisma/client';

interface FormValues {
  bank_statements: BankStatement[];
}

interface BankStatement {
  client_company: string;
  name: string;
  type: string;
  file: File | null;
}

export function BankStatementsDragAndDrop() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const form = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    // Update the form values with the dropped files
    const updatedBankStatements = files.map((file) => ({
      client_company: '',
      name: file.name,
      type: '',
      file: file,
    }));
    form.setFieldValue('bank_statements', updatedBankStatements);
  };

  const handleBankTypeChange = (selectedBankType: BankType | null, index: number) => {
    const updatedBankStatements = form.values.bank_statements.map((statement, i) => {
      if (i === index) {
        return { ...statement, type: selectedBankType?.name || '' };
      }
      return statement;
    });
    form.setFieldValue('bank_statements', updatedBankStatements);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // Start submitting process
    const formData = new FormData();

    // Assuming you keep track of files in a state variable
    form.values.bank_statements.forEach((statement) => {
      if (statement.file) {
        formData.append('files[]', statement.file, statement.type);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/process-csv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result); // Handle the response based on your requirements
      setIsSubmitting(false);
    } catch (error) {
      console.error('Failed to submit:', error);
      setIsSubmitting(false);
      setSubmitError('Failed to submit files. Please try again.');
    }
  };

  const selectedBankStatements =
    form.values.bank_statements?.map((statement, index) => (
      <Table.Tr key={index}>
        <Table.Td style={{ maxWidth: rem(250) }}>
          <Tooltip
            arrowOffset={50}
            arrowSize={5}
            withArrow
            position="top-start"
            label={statement.file ? `${statement.file.name}` : 'Unknown'}
          >
            <Text truncate="end">{statement.file ? `${statement.file.name}` : 'Unknown'}</Text>
          </Tooltip>
        </Table.Td>
        <Table.Td style={{ minWidth: rem(78) }}>
          <Text>
            {statement.file ? `${((statement.file.size / 1024) * 0.001).toFixed(2)} mb` : 'Unknown'}
          </Text>
        </Table.Td>
        <Table.Td style={{ minWidth: rem(57) }}>
          <SelectBankTypeDropdown
            onChange={(selectedBankType) => handleBankTypeChange(selectedBankType, index)}
          />
        </Table.Td>
        <Table.Td>
          <Center>
            <ActionIcon color="red" onClick={() => form.removeListItem('bank_statements', index)}>
              <IconTrash size="1rem" />
            </ActionIcon>
          </Center>
        </Table.Td>
      </Table.Tr>
    )) || [];

  return (
    <div>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop}
          onReject={() => console.log('File is not supported or there is an error')} //change to make a fancy notification
          className={classes.dropzone}
          radius="sm"
          accept={[MIME_TYPES.csv]}
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
                Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files
                that are less than 30mb in size.
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
      <div></div>
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
      <Button
        disabled={isSubmitting}
        onClick={handleSubmit}
        className={classes.submitButton}
        loading={isSubmitting}
      >
        Submit
      </Button>
      <Text size="sm" fw={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </div>
  );
}
