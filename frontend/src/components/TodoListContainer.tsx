"use client";
import { listResType } from "@/types/list-type";
import TodoListCart from "./TodoListCart";
import EmptyTodo from "./EmptyTodo";
import { Button, Form, Input, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export const TodoListContainer = ({ lists }: { lists: listResType }) => {
  const router = useRouter();
  const handelListData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const finalData = {
      ...data,
      completed: false,
    };
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
    const result = await response.json();
    if (result.insertedId) {
      router.refresh();
    }
  };
  const handelSignoutButton = async () => {
  const {data,error} =  await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
    console.log(data,error)
  };
  return (
    <div>
      <div className="flex flex-col justify-center w-full my-5 items-center">
        <div className="border p-8 rounded-xl flex flex-col">
          <div className="flex justify-between mb-3">
            <h1 className="font-bold text-2xl mb-2 text-orange-500">TODO</h1>
            <Button
              onClick={handelSignoutButton}
              className="bg-white border border-transparent hover:border-red-700 text-red-700"
            >
              SignOut
            </Button>
          </div>
          <Form className="flex w-full gap-2" onSubmit={handelListData}>
            <TextField aria-label="list-input" name="title" type="text">
              <Input />
            </TextField>
            <Button type="submit">Update</Button>
          </Form>
          {lists.length > 0 ? (
            <ul className="mt-5 w-75 divide-y divide-zinc-100 border-t pt-2">
              {lists.map((list) => (
                <TodoListCart key={list._id} list={list} />
              ))}
            </ul>
          ) : (
            <EmptyTodo />
          )}
        </div>
      </div>
    </div>
  );
};
