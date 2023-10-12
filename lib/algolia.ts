import algoliasearch from "algoliasearch";

const client = algoliasearch("G5G9RMFS44", process.env.KEY_ALGOLIA);
export const productIndex = client.initIndex("products");
