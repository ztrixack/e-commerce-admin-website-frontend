import { useState, useCallback, useEffect } from 'react';
import { login } from 'containers/UserProvider/actions';

function useHooks({ form, user, dispatch }) {
  const { validateFieldsAndScroll } = form;

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (user.error) {
      setNotice('Invalid username or password');
    }
  }, [user.error]);

  const onLogin = useCallback(
    () => e => {
      e.preventDefault();
      setNotice(null);

      validateFieldsAndScroll((err, values) => {
        if (err) {
          setNotice(err.message);
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
    loading: user.loading,
    events: {
      onLogin,
    },
  };
}

export { useHooks };
