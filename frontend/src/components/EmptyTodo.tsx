import { cn } from "@heroui/react";

const EmptyTodo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "mt-5 flex w-75 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 px-4 py-9 text-center",
        className,
      )}
    >
      <span
        className="mb-2 flex size-11 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Z" />
          <path d="M16 6h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2" />
          <path d="M12 11v6M9 14h6" />
        </svg>
      </span>

      <p className="text-sm font-semibold text-zinc-900">No tasks yet</p>
      <p className="max-w-60 text-xs leading-relaxed text-zinc-500">
        Add your first task with the field above and it will show up right
        here.
      </p>
    </div>
  );
};

export default EmptyTodo;
