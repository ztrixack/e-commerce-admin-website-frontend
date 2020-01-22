import { useCallback } from 'react';
import { UserAPI } from 'api';
import { useAlert, useFetch, usePost } from 'hooks';
import history from 'utils/history';

const config = {
  api: UserAPI.find,
};

function useHooks() {
  const alert = useAlert();
  const [dataSource, loading, error] = useFetch(config);
  const [call, updating] = usePost();

  const handleAdd = useCallback(
    () => () => {
      history.push('users/new');
    },
    [],
  );

  const handleEdit = useCallback(
    () => id => {
      history.push(`users/edit/${id}`);
    },
    [],
  );

  const handleDelete = useCallback(
    () => async id => {
      const [, err] = await call({
        api: UserAPI.delete,
        params: { id },
      });

      if (err) {
        alert.error('Delete user is failed');
        return false;
      }

      alert.info('Delete user is completed');
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
