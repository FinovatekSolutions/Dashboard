import type { ReactElement } from 'react';

import { ViewClientByIDClient } from './page.client';

export default function ViewClientByID({ params }: { params: { clientId: string } }): ReactElement {
  return <ViewClientByIDClient params={params} />;
}
