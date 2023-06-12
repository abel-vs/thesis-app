import { useRouter } from 'next/router';
import Button from '../components/Button';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-3">The page you are looking for doesn`&apos;`t exist.</p>
      <Button text="Go Home" onClick={() => router.push('/')} />
    </div>
  );
}
