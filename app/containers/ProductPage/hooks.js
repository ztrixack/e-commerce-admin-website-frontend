import { ProductAPI } from 'api';
import { useFetch } from 'hooks';

const config = {
  api: ProductAPI.find,
};

function useHooks() {
  const [dataSource, loading, error] = useFetch(config);

  return {
    dataSource,
    loading,
    error,
  };
}

export { useHooks };
