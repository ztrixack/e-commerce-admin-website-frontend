import { useState, useCallback } from 'react';
import { UserAPI } from 'api';
import { useFetch } from 'hooks';

const config = id => ({
  api: UserAPI.findById,
  params: { id },
  required: [id],
});

function useHooks(props) {
  const { id } = props.match.params;

  const [selected, setSelected] = useState(0);
  const [user, loading, error] = useFetch(config(id));

  const handleMenuClick = useCallback(
    () => ({ key }) => {
      setSelected(Number(key));
    },
    [],
  );

  return {
    user,
    loading,
    error,
    selected,
    events: {
      handleMenuClick,
    },
  };
}

export { useHooks };
