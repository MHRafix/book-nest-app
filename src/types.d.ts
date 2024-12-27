interface AppResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

interface IPaginationMeta {
  current_page: number;
  total_items: number;
  total_pages: number;
}
