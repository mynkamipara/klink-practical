import React from 'react';
import type { AppProps } from 'next/app';
import { ToastProvider } from '../components/ToastContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;