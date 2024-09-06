import { Document } from "mongoose";
import { Product } from "./product.interface";

export interface TotalProducts{
  products: Product[],
  totalProductsCount: number,
};