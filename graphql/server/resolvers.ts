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
  Movement: {
    createBy: async (parent, args, context) => {
      const { db } = context;
      const userId = parent?.userId;
      if (!userId) {
        return null;
      }
      const createBy = await db.user.findUnique({
        where: {
          id: userId
        },
      });
      return createBy;
    },
    material: async (parent, args, context) => {
      const { db } = context;
      const materialId = parent?.materialId;
      if (!materialId) {
        return null;
      }
      const material = await db.material.findUnique({
        where: {
          id: materialId
        },
      });
      return material;
    }

  },

  Query: {
    user: async (parent, args, context) => {
      const { db, session } = context;

      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN, Enum_RoleName.USER];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        try {
          const user = await db.user.findFirst(
            {
              where: {
                email: args.email,
              },
            }
          );
          return user;
        } catch (error) {
          return null;
        }
      }

      return null;
    },
    users: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        try {
          const users = await db.user.findMany();
          return users;
        } catch (error) {
          return null;
        }
      }

      return null;
    },
    materials: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN, Enum_RoleName.USER];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        try {
          return await db.$queryRaw`
          SELECT * FROM "material_balance" ORDER BY "createdAt" DESC;
        `;
        } catch (error) {
          return null;
        }
      };

      return null;
    },
    material: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN, Enum_RoleName.USER];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        const materials = await db.material.findMany();
        return materials;
      };
      return null;
    },
    movements: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN, Enum_RoleName.USER];
      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });
      if (hasRoleValidRole) {

        const { name } = args;

        if (!name) {
          try {
            const movements = await db.movement.findMany({
              orderBy: {
                createdAt: 'desc'
              },
              take: 100
            });
            return movements;
          } catch (error) {
            return null;
          }
        }

        try {
          const movements = await db.movement.findMany({
            where: {
              createdAt: args.createdAt,
              material: {
                name: args.name
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
          return movements;
        } catch (error) {
          return null;
        }
      }
      return null;
    },
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const { db } = context;
      try {
        const user = await db.user.create({
          data: {
            name: args.name,
            email: args.email,
          },
        });
        return user;
      } catch (error) {
        return null;
      }
    },

    createMaterial: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      const email = session?.user?.email ?? '';

      const name = args?.name;
      const input = args?.input;

      if (!name || !input || input <= 0) {
        return null;
      }

      if (hasRoleValidRole) {
        try {
          const material = await db.material.create({
            data: {
              name,
              createdBy: {
                connect: {
                  email,
                }
              }
            }
          });

          await db.movement.create({
            data: {
              input,
              output: 0,
              createdBy: {
                connect: {
                  email,
                }
              },
              material: {
                connect: {
                  name: material.name,
                }
              }
            }
          });

          return material;
        } catch (error) {
          return null;
        }
      };

      return null;
    },

    createMovement: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN, Enum_RoleName.USER];

      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      const email = session?.user?.email ?? '';

      if (hasRoleValidRole) {
        const { input } = args;
        const { output } = args;

        if ((input == 0 && output == 0) || (input > 0 && output != 0) || (output > 0 && input != 0)) {
          return null;
        }
        try {
          const movement = await db.movement.create({
            data: {
              input: input,
              output: output,
              createdBy: {
                connect: {
                  email: email
                }
              },
              material: {
                connect: {
                  name: args.name
                }
              }
            }
          });
          return movement;
        } catch (error) {
          return null;
        }
      }
      return null;
    },
    upsertUserRol: async (parent, args, context) => {
      const { db, session } = context;
      const validRoles: Enum_RoleName[] = [Enum_RoleName.ADMIN];
      const hasRoleValidRole: boolean = await hasRole({ db, session, validRoles });

      if (hasRoleValidRole) {
        try {
          const role = await db.role.findFirst({
            where: {
              name: args.roleName
            }
          })
          const roleId = role?.id;
          if (!roleId) {
            return null;
          }
          const user = await db.user.upsert({
            where: {
              email: args.email
            },
            update: {
              roleId: roleId,
            },
            create: {
              email: args.email,
              roleId: roleId
            }
          });
          return user;
        } catch (error) {
          return null;
        }
      }
    },
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