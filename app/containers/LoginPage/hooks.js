import React, { useState } from 'react';
import { login } from 'containers/UserProvider/actions';

function useHooks({ form, user, dispatch }) {
  const [notice, setNotice] = useState(null);
  const onLogin = React.useCallback(
    () => e => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (err) {
          setNotice(err);
          return;
        }

        dispatch(login(values), setNotice);
      });
    },
    [dispatch, form],
  );

  return {
    notice,
    isAuthenticated: user && user.isAuthenticated && user.data,
    event: {
      onLogin,
    },
  };
}

export { useHooks };
