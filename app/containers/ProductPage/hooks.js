import { useState, useCallback } from 'react';
import { ProductAPI } from 'api';
import { useFetch, usePost } from 'hooks';

const config = {
  api: ProductAPI.find,
};

function useHooks() {
  const [alert, setAlert] = useState(['', '']);
  const [dataSource, loading, error] = useFetch(config);
  const [call, updating] = usePost();

  const handleAdd = useCallback(
    () => async data => {
      const [result, err] = await call({
        api: ProductAPI.create,
        payload: data,
      });

      if (err) {
        setAlert(['error', 'Add product is failed']);
        return null;
      }

      setAlert(['info', 'Add product is completed']);
      return result;
    },
    [call],
  );

  const handleEdit = useCallback(
    () => async (id, data) => {
      const [result, err] = await call({
        api: ProductAPI.update,
        params: { id },
        payload: data,
      });

      if (err) {
        setAlert(['error', 'Edit product is failed']);
        return null;
      }

      setAlert(['info', 'Edit product is completed']);
      return result;
    },
    [call],
  );

  const handleDelete = useCallback(
    () => async id => {
      const [, err] = await call({
        api: ProductAPI.delete,
        params: { id },
      });

      if (err) {
        setAlert(['error', 'Delete product is failed']);
      } else {
        setAlert(['info', 'Delete product is completed']);
      }

      return !err;
    },
    [call],
  );

  const resetAlert = useCallback(() => {
    setAlert(['', '']);
  }, []);

  return {
    dataSource,
    loading,
    updating,
    error,
    alert,
    setAlert,
    events: {
      handleAdd,
      handleEdit,
      handleDelete,
      resetAlert,
    },
  };
}

export { useHooks };
