import React, { useState } from 'react';
import { login } from 'containers/UserProvider/actions';

function useHooks({ form, user, dispatch }) {
  const { validateFieldsAndScroll } = form;

  const [notice, setNotice] = useState(null);

  const onLogin = React.useCallback(
    () => e => {
      e.preventDefault();

      validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }

        dispatch(login(values));
      });
    },
    [dispatch, validateFieldsAndScroll],
  );

  return {
    notice,
    isAuthenticated: user && user.isAuthenticated,
    events: {
      onLogin,
    },
  };
}

export { useHooks };
