import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Thesis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Tool <a className="text-green-600">X</a>
        </h1>

        <p className="mt-3 text-2xl">Automated model compression for deep learning.</p>

        <div className="my-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:bg-gray-100">
            <h3 className="text-2xl font-bold">Model State &rarr;</h3>
            <p className="mt-4 text-xl">
              This file contains your trained model. It should be a
              <code className="rounded-md bg-gray-100 p-1 m-1 font-mono text-lg">.pt</code> or{' '}
              <code className="rounded-md bg-gray-100 p-1 m-1 font-mono text-lg">.pth</code> file.
            </p>
          </a>

          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:bg-gray-100">
            <h3 className="text-2xl font-bold">Model Architecture &rarr;</h3>
            <p className="mt-4 text-xl">
              This file contains the architecture of your model. It should be a
              <code className="rounded-md bg-gray-100 p-1 m-1 font-mono text-lg">.py</code> file.
            </p>
          </a>

          <button
            className="transition ease-in-out delay-150 hover:translate-y-1 duration-300 bg-black text-white font-bold py-2 px-4 rounded-xl w-full m-8"
            onClick={() => alert('Button clicked!')}
          >
            Next
          </button>
        </div>
      </main>

      <footer className="flex h-24 mt-6 w-full items-center justify-center border-t">
        <a className="flex items-center justify-center gap-2">Thesis Project by Abel Van Steenweghen</a>
      </footer>
    </div>
  );
};

export default Home;
