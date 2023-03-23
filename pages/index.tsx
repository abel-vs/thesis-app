import type { NextPage } from 'next';
import Button from '../components/Button';
import Link from 'next/link';
import GradientText from '../components/GradientText';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-6xl font-bold">
        Tool <GradientText text="X" />
      </h1>
      <p className="mt-3 text-2xl">Automated model compression for deep learning.</p>
      <Link href="/model" className="w-80 m-8">
        <Button text="Start" />
      </Link>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
