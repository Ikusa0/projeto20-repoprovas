import prisma from "../../src/databases/prisma";
import { User } from "../../src/repositories/authRepository";
import * as cryptographyUtils from "../../src/utils/cryptographyUtils";

type NewUser = User & { confirmPassword: string };

export function generateNewUser(user?: Partial<NewUser>): NewUser {
  return {
    email: user?.email || "adoleta@gmail.com",
    password: user?.password || "12!@ABcdPO",
    confirmPassword: user?.confirmPassword || "12!@ABcdPO",
  };
}

export function generateUser(user?: Partial<User>): User {
  return {
    email: user?.email || "adoleta@gmail.com",
    password: user?.password || "12!@ABcdPO",
  };
}

export async function insertNewUser() {
  const user = generateNewUser();
  await prisma.users.create({
    data: {
      email: user.email,
      password: cryptographyUtils.hashString(user.password),
    },
  });
  return user;
}

export async function insertUser() {
  const user = generateUser();
  await prisma.users.create({
    data: {
      email: user.email,
      password: cryptographyUtils.hashString(user.password),
    },
  });
  return user;
}
