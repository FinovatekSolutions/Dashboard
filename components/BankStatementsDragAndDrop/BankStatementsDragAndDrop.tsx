import { Group, Text, px, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';

export function BankStatementsDragAndDrop(props: Partial<DropzoneProps>) {
  return (
    <Dropzone 
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      accept={[
        MIME_TYPES.pdf,
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
  );
}