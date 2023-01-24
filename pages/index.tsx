import type { NextPage } from 'next';
import Title from '../components/Title';
import Link from 'next/link';
import Button from '../components/Button';

const Home: NextPage = () => {
  return (
    <>
      <Title />
      <Link href="/model" className="w-80  m-8">
        <Button text="Start" />
      </Link>
    </>
  );
};

export default Home;
