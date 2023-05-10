import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { resolvers } from 'graphql/server/resolvers';
import { typeDefs } from 'graphql/server/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { Context } from 'types';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const serverHandler = startServerAndCreateNextHandler<NextApiRequest, Context>(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    // eslint-disable-next-line no-console
    return {
      req,
      res,
      db: prisma,
      session,
    };
  },
});

const graphqlServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  // eslint-disable-next-line no-console
  console.log('Session: ', session);
  if (process.env.NODE_ENV === 'production' && !session) {
    res.status(401).send("Unauthorized");
    return;
  }
  return serverHandler(req, res);
};

export default graphqlServer;