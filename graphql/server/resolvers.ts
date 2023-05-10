import { Resolver } from 'types';

const resolvers: Resolver = {

  User: {
    role: async (parent, args, context) => {
      const { db } = context;
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
      // eslint-disable-next-line no-console
      console.log('Session resolver: ', session);
      const user = await db.user.findFirst(
        {
          where: {
            email: args.email,
          },
        }
      );
      return user;
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

export { resolvers };