import { useState, useCallback } from 'react';
import { UserAPI } from 'api';
import { useFetch, usePost } from 'hooks';

const config = {
  api: UserAPI.find,
};

function useHooks() {
  const [alert, setAlert] = useState(['', '']);
  const [dataSource, loading, error] = useFetch(config);
  const [call, updating] = usePost();

  const handleAdd = useCallback(
    () => async data => {
      const [result, err] = await call({
        api: UserAPI.create,
        payload: data,
      });

      if (err) {
        setAlert(['error', 'Add user is failed']);
        return null;
      }

      setAlert(['info', 'Add user is completed']);
      return result;
    },
    [call],
  );

  const handleEdit = useCallback(
    () => async (id, data) => {
      const [result, err] = await call({
        api: UserAPI.update,
        params: { id },
        payload: data,
      });

      if (err) {
        setAlert(['error', 'Edit user is failed']);
        return null;
      }

      setAlert(['info', 'Edit user is completed']);
      return result;
    },
    [call],
  );

  const handleDelete = useCallback(
    () => async id => {
      const [, err] = await call({
        api: UserAPI.delete,
        params: { id },
      });

      if (err) {
        setAlert(['error', 'Delete user is failed']);
      } else {
        setAlert(['info', 'Delete user is completed']);
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
    events: {
      handleAdd,
      handleEdit,
      handleDelete,
      resetAlert,
    },
  };
}

export { useHooks };
