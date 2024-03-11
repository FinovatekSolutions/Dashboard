import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconX, IconDownload } from '@tabler/icons-react';
import classes from './BankStatementsDragAndDrop.module.css';

export function BankStatementsDragAndDrop() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => {}}
        className={classes.dropzone}
        radius="sm"
        accept={[MIME_TYPES.pdf, MIME_TYPES.csv, MIME_TYPES.xls,MIME_TYPES.xlsx]}
        maxSize={30 * 1024 ** 2}
        style={{borderStyle: 'dashed', borderWidth: 2, borderRadius: 10, color: 'dimgray'}}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center" mt={rem(5)}>
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50)}}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50)}}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconDownload style={{ width: rem(50), height: rem(50)}} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="sm">
            <Dropzone.Accept>Drop the Bank Statements</Dropzone.Accept>
            <Dropzone.Reject>Incorrect file type or file size is more than 30mb </Dropzone.Reject>
            <Dropzone.Idle>Upload Bank Statements</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed" pb="xl">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf, .csv, .xls, .xlsx</i> files that
            are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}