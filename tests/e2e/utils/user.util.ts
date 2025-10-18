import { User } from "@/types/user.type";
import { randomUUID } from "crypto";

export async function createTestUser(): Promise<User> {
  const email = `${randomUUID()}@example.com`;
  const password = "strongPassword123";

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create test user: ${response.status} ${response.statusText}`,
    );
  }

  return { email, password };
}
