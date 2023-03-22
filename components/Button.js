import { Spinner } from "flowbite-react";

function Button({ text, onClick = () => {}, disabled = false, loading = false }) {
  return (
    <button
      className="  w-full enabled:transition enabled:hover:translate-y-1 ease-in-out delay-150  duration-300 bg-black enabled:text-white font-bold py-2 rounded-xl disabled:bg-gray-300 disabled:text-gray-400"
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <>
          {' '}
          <Spinner className="mb-1" /> Loading...
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
