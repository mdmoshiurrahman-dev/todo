"use client";
import { Button, Checkbox, cn } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { listType } from "@/types/list-type";

const TodoListCart = ({ list }: { list: listType }) => {
  const router = useRouter();

  const handelDelete = async () => {
    const response = await fetch("http://localhost:5000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    if (response.ok) {
      router.refresh();
    }
  };

  const handelDoneButton = async () => {
    const response = await fetch("http://localhost:5000/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...list,
        completed: !list.completed,
      }),
    });
    if (response.ok) {
      router.refresh();
    }
  };
  return (
    <li
      className={cn(
        "group flex min-h-13 items-center gap-2.5 rounded-lg px-1 py-2.5 transition-all duration-200",
        "hover:bg-zinc-50",
        list.completed && "bg-zinc-50/60",
      )}
    >
      <Checkbox
        onClick={handelDoneButton}
        isSelected={list.completed}
        className="min-w-0 flex-1 [--accent:#f97316] [--accent-hover:#ea580c]"
      >
        <Checkbox.Content className="w-full min-w-0">
          <Checkbox.Control
            className={cn(
              "size-5 shrink-0 rounded-full border",
              list.completed
                ? "border-transparent"
                : "border-zinc-300 bg-white",
            )}
          >
            <Checkbox.Indicator />
          </Checkbox.Control>
          <span
            className={cn(
              "min-w-0  text-sm font-medium transition-colors duration-150",
              list.completed ? "text-zinc-400 line-through" : "text-zinc-900",
            )}
          >
            {list.title}
          </span>
        </Checkbox.Content>
      </Checkbox>

      <span
        className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase"
        aria-hidden="true"
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            list.completed ? "bg-green-500" : "bg-zinc-300",
          )}
        />
        <span className={list.completed ? "text-green-600" : "text-yellow-400"}>
          {list.completed ? "Done" : "Pending"}
        </span>
      </span>

      <Button
        onClick={handelDelete}
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label={`Delete ${list.title}`}
        className="size-8 min-w-8 shrink-0 text-zinc-400 opacity-100 transition-opacity duration-150 hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </Button>
    </li>
  );
};

export default TodoListCart;
