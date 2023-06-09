import { Material, Movement, PrismaClient, Role, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth/core/types";

export interface Context {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  session: Session | null
}

interface ResolverFunction {
  [key: string]: (parent: any, args: any, context: Context) => Promise<any>;
}

export interface Resolver {
  Query: ResolverFunction;
  Mutation: ResolverFunction;
  [key: string]: ResolverFunction;
}

export interface MaterialBalance {
  id: string;
  createdAt: string;
  name: String;
  balance: number;
}

export interface MaterialBalanceResult {
  balance: number;
}

export interface ExtendedUser extends User {
  role: Role;
}

export interface ExtendedMovement extends Movement {
  material: Material;
}