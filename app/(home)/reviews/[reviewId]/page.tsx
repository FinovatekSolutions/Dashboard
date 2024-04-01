import type { ReactElement } from 'react';

import { ViewReviewByIDClient } from './page.client';

export default function ViewClientByID({ params }: { params: { reviewId: string } }): ReactElement {
  return <ViewReviewByIDClient params={params} />;
}
