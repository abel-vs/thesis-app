interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
      {children}
    </span>
  );
}
