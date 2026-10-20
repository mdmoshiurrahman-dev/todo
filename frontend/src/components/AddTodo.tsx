"use client";
import React from "react";
import { Button, Form, Input, TextField } from "@heroui/react";
const AddTodo = () => {
  const handelListData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const finalData = {
      ...data,
      completed: false,
    };
    await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
  };
  return (
    <>
      <Form className="flex w-full gap-2" onSubmit={handelListData}>
        <TextField aria-label="list-input" name="title" type="text">
          <Input />
        </TextField>
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
};

export default AddTodo;
