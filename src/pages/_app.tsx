import '@/styles/variables.css';
import '@/styles/typography.css';
import '@/styles/layout.css';
import '@/styles/components.css';
import '@/styles/components-custom.css';
import '@/styles/globals.css';
import '@/styles/home.css';
import '@/styles/bed-planning.css';

import { PlantDatabaseProvider } from '@/context/PlantDatabaseContext';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlantDatabaseProvider>
      <Component {...pageProps} />
    </PlantDatabaseProvider>
  );
}
