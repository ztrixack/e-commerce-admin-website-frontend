import { useCallback } from 'react';
import { ProductAPI } from 'api';
import { useAlert, useFetch, usePost } from 'hooks';

const config = {
  api: ProductAPI.find,
};

function useHooks() {
  const alert = useAlert();
  const [dataSource, loading, error] = useFetch(config);
  const [call, updating] = usePost();

  const handleAdd = useCallback(
    () => async data => {
      const [result, err] = await call({
        api: ProductAPI.create,
        payload: data,
      });

      if (err) {
        alert.error('Add product is failed');
        return null;
      }

      alert.info('Add product is completed');
      return result;
    },
    [alert, call],
  );

  const handleEdit = useCallback(
    () => async (id, data) => {
      const [result, err] = await call({
        api: ProductAPI.update,
        params: { id },
        payload: data,
      });

      if (err) {
        alert.error('Edit product is failed');
        return null;
      }

      alert.info('Edit product is completed');
      return result;
    },
    [alert, call],
  );

  const handleDelete = useCallback(
    () => async id => {
      const [, err] = await call({
        api: ProductAPI.delete,
        params: { id },
      });

      if (err) {
        alert.error('Delete product is failed');
        return false;
      }

      alert.info('Delete product is completed');
      return true;
    },
    [alert, call],
  );

  return {
    dataSource,
    loading,
    updating,
    error,
    alert,
    events: {
      handleAdd,
      handleEdit,
      handleDelete,
    },
  };
}

export { useHooks };
