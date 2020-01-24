import { useState, useCallback } from 'react';
import { UserAPI } from 'api';
import { useAlert, usePost } from 'hooks';
import history from 'utils/history';

function useHooks() {
  const alert = useAlert();
  const [selected, setSelected] = useState(0);
  const [user, setUser] = useState(null);
  const [call, submitting] = usePost();

  const handleNext = useCallback(
    () => u => {
      setSelected(s => s + 1);
      setUser(u);
    },
    [],
  );

  const handlePrevious = useCallback(
    () => () => {
      setSelected(s => s - 1);
    },
    [],
  );

  const handleComplete = useCallback(
    () => async data => {
      const [, err] = await call({
        api: UserAPI.create,
        payload: {
          ...user,
          ...data,
        },
      });

      if (err) {
        alert.error('Create user is failed');
      } else {
        alert.info('Create user is completed');
        history.push('../users');
      }
    },
    [call, user, alert],
  );

  return {
    submitting,
    selected,
    alert,
    events: {
      handleNext,
      handlePrevious,
      handleComplete,
    },
  };
}

export { useHooks };
