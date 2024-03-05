'use client';

export function ViewClientByIDClient({ params }: { params: { clientId: string } }) {
  return <div>My Post: {params.clientId}</div>;
}
