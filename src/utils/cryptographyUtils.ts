import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export function hashString(text: string): string {
  const hashedString: string = bcrypt.hashSync(text, 10);
  return hashedString;
}

export function compareHashedString(hashed: string, plain: string): boolean {
  const match: boolean = bcrypt.compareSync(plain, hashed);
  return match;
}
