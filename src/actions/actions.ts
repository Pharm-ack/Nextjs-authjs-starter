"use server";

import { parseWithZod } from "@conform-to/zod";
import { LoginSchema, RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
};

export async function register(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: RegisterSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { name, email, password } = submission.value;

  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length > 0) {
      return {
        status: "error",
        message: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
      image: "",
    });
    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function login(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: LoginSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { email, password } = submission.value;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid email or password",
          };
        default:
          return {
            status: "error",
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
