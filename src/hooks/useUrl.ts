import { useSearchParams } from 'react-router-dom';

function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  function readUrl<TQuery>(query: string) {
    return searchParams.get(query) as TQuery | null;
  }

  function setUrl(query: string, value: string) {
    searchParams.set(query, value);
    setSearchParams(searchParams);
  }

  return { readUrl, setUrl };
}

export default useUrl;
