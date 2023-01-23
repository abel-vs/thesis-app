function Button({ text, disabled = false }) {
  return (
    <button
      className="enabled:transition enabled:hover:translate-y-1 ease-in-out delay-150  duration-300 bg-black enabled:text-white font-bold py-2 rounded-xl w-full  disabled:bg-gray-300 disabled:text-gray-400"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
