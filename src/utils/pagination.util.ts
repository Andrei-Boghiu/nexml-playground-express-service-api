interface PaginationOptions {
  defaultPage?: number;
  defaultLimit?: number;
  maxLimit?: number;
}

export function getPaginationParams(
  pageStr?: string,
  limitStr?: string,
  options: PaginationOptions = {}
): { page: number; limit: number; skip: number } {
  const defaultPage = options.defaultPage ?? 1;
  const defaultLimit = options.defaultLimit ?? 25;
  const maxLimit = options.maxLimit ?? 100;

  let page = parseInt(pageStr ?? "", 10);
  if (isNaN(page) || page < 1) page = defaultPage;

  let limit = parseInt(limitStr ?? "", 10);
  if (isNaN(limit) || limit < 1) limit = defaultLimit;
  else if (limit > maxLimit) limit = maxLimit;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
