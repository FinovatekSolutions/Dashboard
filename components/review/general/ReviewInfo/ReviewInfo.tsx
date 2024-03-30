import { Group, Text, Title, Tooltip } from '@mantine/core';
import { IconCalendar, IconCalendarMonth, IconPencil, IconUser } from '@tabler/icons-react';

import classes from './ReviewInfo.module.css';
import { useGetReviewById } from '@/lib/actions/review';
import { calculatePeriod, formatDate } from '@/lib/utils/helpers';

export function ReviewInfo({ reviewId }: { reviewId: string }) {
  const getReviewByIdQuery = useGetReviewById(reviewId);

  return (
    <div>
      <Group wrap="nowrap">
        <div>
          <Text fz="md" tt="uppercase" fw={500} c="dimmed">
            Review Information
          </Text>

          <Title order={2} fw={500}>
            {getReviewByIdQuery.data?.name}
          </Title>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Tooltip label="Client">
              <IconUser stroke={1.5} size="1.2rem" className={classes.icon} />
            </Tooltip>
            <Text fz="sm" c="dimmed">
              {getReviewByIdQuery.data?.client?.firstName}{' '}
              {getReviewByIdQuery.data?.client?.lastName} (
              {getReviewByIdQuery.data?.client?.company})
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Tooltip label="Period">
              <IconCalendarMonth stroke={1.5} size="1.2rem" className={classes.icon} />
            </Tooltip>
            <Text fz="sm" c="dimmed">
              {calculatePeriod(
                getReviewByIdQuery.data?.startDate ?? null,
                getReviewByIdQuery.data?.endDate ?? null
              )}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <Tooltip label="Author">
              <IconPencil stroke={1.5} size="1.2rem" className={classes.icon} />
            </Tooltip>
            <Text fz="sm" c="dimmed">
              {getReviewByIdQuery.data?.user?.name}
            </Text>
          </Group>
          <Group wrap="nowrap" gap={10} mt={5}>
            <Tooltip label="Created on">
              <IconCalendar stroke={1.5} size="1.2rem" className={classes.icon} />
            </Tooltip>
            <Text fz="sm" c="dimmed">
              {formatDate(getReviewByIdQuery.data?.createdAt ?? null)}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
