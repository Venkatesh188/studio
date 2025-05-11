// Add custom type definitions to make Next.js 15 happy
import { NextPage } from 'next';

declare module 'next' {
  export type PageProps = {
    params: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  };
  
  export type NextPageWithParams<P = Record<string, string>> = NextPage<{
    params: P;
    searchParams?: Record<string, string | string[]>;
  }>;
} 