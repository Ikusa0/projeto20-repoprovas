import { Categories } from "@prisma/client";
import db from "../databases/prisma";

export type Category = Omit<Categories, "id">;

export function findById(id: number): Promise<Categories | null> {
  return db.categories.findUnique({ where: { id } });
}
