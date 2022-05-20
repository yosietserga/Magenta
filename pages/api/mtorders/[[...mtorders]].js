import NextCrud, { PrismaAdapter } from "@premieroctet/next-crud";

const adapter = new PrismaAdapter({ modelName: "MTOrder" });

export default NextCrud({
  resourceName: "mtorders", // Same as your folder name
  adapter
});

