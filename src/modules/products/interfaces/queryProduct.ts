export interface QueryRouter {
  searchKey?: string;
  searchValue?: "asc" | "desc";
  page?: number;
  pageSize?: number;
  sortKey?: string;
  sortValue?: string;
}
