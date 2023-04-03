import { z } from "zod";
import { prisma } from '../../db';

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const itemRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input, ctx }) => {
      // get items from prisma mongodb where name contains input.query. sort best matches first
     return {items: await ctx.prisma.item.findMany({
        where: {
          name: {
            contains: input.query,
            mode: 'insensitive'
          },
        },
        orderBy: {
          name: "asc",
        },
        take:200
      })
    }
      

      
    }),
});
