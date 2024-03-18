'use client';

import {PropsWithChildren} from 'react';

export default function AppError(props: PropsWithChildren) {
  console.error(props);
  return (
    <h1>Error loading dashboard</h1>
  );
}
