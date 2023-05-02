import { Resolver } from 'types';

const resolvers: Resolver = {
  Query: {
    user: async (parent, args, context) => {
      const { db } = context;
      const user = await db.user.findFirst(
        {
          where: {
            email: args.email,
          },
        }
      );
      return user;
    },
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