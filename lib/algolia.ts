import algoliasearch from "algoliasearch";

const client = algoliasearch("G5G9RMFS44", "915e174733374f79a91a2810bf7691db");
export const productIndex = client.initIndex("products");
