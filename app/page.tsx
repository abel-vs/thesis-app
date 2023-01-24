import '../styles/globals.css';

import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from './head';
import Title from '../components/Title';
import Link from 'next/link';
import Button from '../components/Button';

const HomePage: NextPage = () => {
  const [modelStateFile, setModelState] = useState(null);
  const [modelArchitectureFile, setModelArchitecture] = useState(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 pt-10 text-center">
        <Title />
        <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link href="/model" className="w-80  m-8">
            <Button text="Start" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
