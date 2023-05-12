import { Enum_RoleName, PrismaClient } from '@prisma/client';
import { Resolver } from 'types';
import { Session } from "next-auth/core/types";

const resolvers: Resolver = {

  User: {
    role: async (parent, args, context) => {
      const { db } = context;
      const roleId = parent?.roleId;

      if (!roleId) {
        return null;
      }

      const role = await db.role.findUnique({
        where: {
          id: parent.roleId
        },
      });
      return role;
    }
  },

  Query: {
    user: async (parent, args, context) => {
      const { db, session } = context;

      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN, Enum_RoleName.USER];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        const user = await db.user.findFirst(
          {
            where: {
              email: args.email,
            },
          }
        );
        return user;
      }
      return null;
    },
    users: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        const users = await db.user.findMany();
        return users;
      }

      return null;
    }
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const { db } = context;
      const user = await db.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
      return user;
    }
  },
}

interface hasRoleProps {
  db: PrismaClient;
  session: Session | null;
  validRoles: Enum_RoleName[];
}

const hasRole = async ({ db, session, validRoles }: hasRoleProps) => {
  if (!session) {
    return false;
  }

  const email = session?.user?.email ?? '';

  if (!email) {
    return false;
  }

  const userSession = await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      role: true,
    },
  });

  const userRole = userSession?.role?.name;

  if (!userRole) {
    return false;
  }

  return validRoles.includes(userRole);
}

export { resolvers };