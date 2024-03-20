import type { ReactElement } from 'react';

import { ViewReviewByIDClient } from './page.client';

export default function ViewClientByID({ params }: { params: { clientId: string } }): ReactElement {
  return <ViewReviewByIDClient params={params} />;
}
