interface CodeProps {
  children: React.ReactNode;
}

function Code({ children }: CodeProps) {
  return <code className="rounded-md bg-gray-100 p-1 m-1 font-mono">{children}</code>;
}

export default Code;
