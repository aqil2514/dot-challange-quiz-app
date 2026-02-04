import type { LoginSchemaType } from "../schema/login.schema";

export const dummyUser: LoginSchemaType[] = [
  {
    username: "admin",
    password: "admin123",
  },
  {
    username: "user01",
    password: "user1234",
  },
  {
    username: "tester",
    password: "tester123",
  },
  {
    username: "guest",
    password: "guest123",
  },
];
