import { Document } from "mongoose";

export interface SortOptions{
    sort: Record<string, 'asc' | 'desc'>;
    page?: number;
    limit?: number;
  }
  