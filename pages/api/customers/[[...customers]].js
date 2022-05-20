import NextCrud, { PrismaAdapter } from "@premieroctet/next-crud";

//validate JWT and session

export default NextCrud({
  resourceName: "customers", // Same as your folder name
  adapter: new PrismaAdapter({
    modelName: "Customer", // Prisma model name, must match the one generated in your prisma client
  }),
});