import { UserDao } from "@/databases/daos/user.dao";
import { randomUUID } from "crypto";

export class Database {
  private users: UserDao[] = [];

  async createUser({
    id,
    email,
    password,
  }: {
    id: string;
    email: string;
    password: string;
  }): Promise<UserDao | undefined> {
    if (this.users.find((user) => user.id === id)) return undefined;
    const newUser = new UserDao({ id, email, password });
    this.users = [...this.users, newUser];

    return Promise.resolve(newUser);
  }

  async findUserByEmail(email: string): Promise<UserDao | undefined> {
    return Promise.resolve(this.users.find((user) => user.email === email));
  }

  async findUserById(id: string): Promise<UserDao | undefined> {
    return Promise.resolve(this.users.find((user) => user.id === id));
  }
}

const database = new Database();

// Test user for development purposes
database.createUser({
  id: randomUUID(),
  email: "user@example.com",
  password: "strongPassword123",
});

export { database };
