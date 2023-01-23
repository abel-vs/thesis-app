import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import DropZone from '../components/DropZone';
import Title from '../components/Title';
import Link from 'next/link';
import Button from '../components/Button';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Thesis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 pt-10 text-center">
        <Title />
        <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link href="/model" className="w-80  m-8">
            <Button text="Start" />
          </Link>
        </div>
      </main>

      <footer className="flex h-24 mt-6 w-full items-center justify-center border-t">
        <a className="flex items-center justify-center gap-2">Thesis Project by Abel Van Steenweghen</a>
      </footer>
    </div>
  );
};

export default Home;
