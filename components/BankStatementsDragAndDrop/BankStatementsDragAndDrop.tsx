import { Group, Text, px, rem, Center, CloseButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';

interface FormValues {
  files: File[];
}

export function BankStatementsDragAndDrop(props: Partial<DropzoneProps>) {
  const form = useForm<FormValues>({
    initialValues: { files: [] },
  });

  const selectedFiles = form.values.files.map((file, index) => (
    <Text key={file.name}>
      <b>{file.name}</b> ({(file.size / 1024).toFixed(2)} kb)
      <CloseButton
        size="xs"
        onClick={() =>
          form.setFieldValue(
            'files',
            form.values.files.filter((_, i) => i !== index)
          )
        }
      />
    </Text>
  ));

  return (
    <>
      <Dropzone
        onDrop={(files) => form.setFieldValue('files', files)}
        onReject={() => form.setFieldError('files', 'Select PDf or Excel Type Files only')}
        accept={[
          MIME_TYPES.pdf,
          MIME_TYPES.png,
          MIME_TYPES.csv,
          MIME_TYPES.xls,
          MIME_TYPES.xlsx,
        ]}        
        style={{borderStyle: 'solid', borderWidth: 2, borderRadius: 20, color: 'dimgray'}}
      >
        <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
          <Text fw = {600} size="md" inline>
            Drag spreadsheets or pdf files here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like
          </Text>
        </div>
      </Group>
  </Dropzone>

      {form.errors.files && (
        <Text c="red" mt={5}>
          {form.errors.files}
        </Text>
      )}

      {selectedFiles.length > 0 && (
        <>
          <Text mb={5} mt="md">
            Selected files:
          </Text>
          {selectedFiles}
        </>
      )}
    </>

  );
}