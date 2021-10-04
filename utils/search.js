// import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import axios from "axios";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function useSearch(title) {
  const data = await fetcher(`/api/search?s=${title}`);

  return {
    items: data,
    isLoading: !data,
  };
}

export function useSWRSearch(title) {
  // const { data, error } = useSWR(`/api/search?s=${title}`, fetcher);
  // https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
  const { data, error } = useSWRImmutable(`/api/search?s=${title}`, fetcher);

  return {
    items: data,
    isLoading: !error && !data,
    isError: error,
  };
}
