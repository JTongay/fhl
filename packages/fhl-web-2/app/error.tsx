'use client';

import {Button} from '@/components/ui/button';
import {PropsWithChildren} from 'react';

export default function AppError(props: PropsWithChildren) {
  console.error(props);
  return (
    <section className="
    bg-primary1 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-1 flex-row justify-center items-center">
        <div className="max-w-sm p-4">
          <img src="/Error_Icon.png" alt="Error" />
        </div>
        <div className="flex flex-1 flex-col items-center">
          <h1 className="
        text-error font-mono text-xl">Error loading dashboard</h1>
          <Button variant="secondary"
            onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    </section>
  );
}
