export interface PaginationCategoryResponse<T> {
    data: T[];
    total: number,
    page: number;
    limit: number;
    totalPage: number;
    firstPage: number;
    lastPage: number;
    nextPage: number | null;
    prevPage: number | null;
}