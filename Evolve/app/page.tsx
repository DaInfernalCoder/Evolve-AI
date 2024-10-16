import dynamic from 'next/dynamic';

const Homepage = dynamic(() => import('./homepage/page'), { ssr: true });

export default function Home() {
  return <Homepage />;
}
