"use client";
import { signIn, useSession } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

export default function Basic() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
  };
  const handelSignInWithGoogle = async () => {
    const { data, error } = await signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="flex flex-col gap-3 items-center mt-7">
      <div className="border p-4 rounded-xl">
        <div>
          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }

                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button type="submit">Submit</Button>
                <Button type="reset" variant="secondary">
                  Reset
                </Button>
              </div>
              <Link
                className="text-[14px] text-[#0485F7] hover:underline"
                href={"/sign-up"}
              >
                Don&apos;t have account ?
              </Link>
            </div>
          </Form>
        </div>
        <p className="text-center my-3 font-extralight text-xl">
          ---------- OR ----------
        </p>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-[#34A853]"
            onClick={handelSignInWithGoogle}
          >
            Google
          </Button>
          <Button className="w-full">Facebook</Button>
        </div>
      </div>
    </div>
  );
}
