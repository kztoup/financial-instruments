import { useEffect, useState } from "react";

/**
 * Generic hook to load async data.
 *
 * @template T - The type of data returned by the fetcher.
 *
 * @param fetcher - A function that returns a promise resolving to data of type `T`.
 *
 * @returns An object containing:
 * - `data`: The loaded data (or `null` before loaded)
 * - `loading`: `true` while loading, otherwise `false`
 * - `error`: The error thrown during loading, if any
 */

const useAsyncData = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        if (isMounted) {
          setData(result);
        }
        // For testing performance with large datasets, we can simulate by replicating the result.
        // if (isMounted) {
        //   const data = Array(100)
        //     .fill(result)
        //     .flat()
        //     .map((item) => ({
        //       ...item,
        //       ticker: `${item.ticker}_${crypto.randomUUID()}`,
        //     }));

        //   setData(data);
        // }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { data, loading, error };
};

export default useAsyncData;
