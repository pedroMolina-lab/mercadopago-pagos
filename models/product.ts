import { SearchIndex } from "algoliasearch";
import { productIndex } from "lib/algolia";

export interface ProductData {
  objectID: string;
  name: string;
  in_stock: boolean;
  link: string;
  type: string;
  images: Array<any>;
  description: string;
  size: string;
  unit_cost: number;
}

export class Product {
  id: string;
  ref: SearchIndex;
  data: ProductData;
  constructor(id: string) {
    this.id = id;
    this.ref = productIndex;
  }
  static async search(query: string) {
    const data = await productIndex.search(query, {
      
    });
    return data;
  }
}
