export type Cache<T> = {
  value: T;
  time: number;
};
export function createPaginationCacheKey(page: number, pageSize: number) {
  return `${page}_${pageSize}`;
}
const CACHE_EXPIRED_TIME = 1000 * 60 * 5; // 5min
export function getValueFromCache<TKey, TValue>(
  cache: Map<TKey, Cache<TValue>>,
  key: TKey
): TValue | undefined {
  if (cache.has(key)) {
    const value = cache.get(key);
    if (Date.now() - value.time < CACHE_EXPIRED_TIME) {
      return value.value;
    } else {
      cache.delete(key);
    }
  }
  return undefined;
}

/**
 * Creates a caching function that memoizes the results of a given function.
 *
 * @param {function} fn - The function to be memoized.
 * @return {function} The memoized function.
 */
export function createCacheFunction<TValue extends unknown[], TResult>(
  fn: (...args: TValue) => TResult
) {
  const cache: Record<string, TResult> = {};

  return (...args: TValue) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const result = fn(...args);
      cache[key] = result;
      return result;
    }
  };
}

/**
 * Creates a cached version of an asynchronous function.
 *
 * @param {function} fn - The original asynchronous function.
 * @return {function} - The cached version of the function.
 */
export function createCacheAsyncFunction<TValue extends unknown[], TResult>(
  fn: (...args: TValue) => Promise<TResult> // Change the return type to Promise<TResult>
) {
  const cache: Record<string, TResult> = {};

  return async (...args: TValue) => {
    // Add the async keyword
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const result = await fn(...args); // Use await to wait for the asynchronous result
      cache[key] = result;
      return result;
    }
  };
}
