import NextCrud, { PrismaAdapter } from "@premieroctet/next-crud";

//validate JWT and session

export default NextCrud({
  resourceName: "mtaccounts", // Same as your folder name
  adapter: new PrismaAdapter({
    modelName: "MTAccount", // Prisma model name, must match the one generated in your prisma client
  }),
});