import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/es');
  return null;
} 