import React from 'react';
import { logout } from 'containers/UserProvider/actions';

function useHooks({ user, dispatch }) {
  const userInfo = user.data;
  const [collapse, setCollapse] = React.useState(false);

  const onCollapse = React.useCallback(
    () => isCollapse => {
      setCollapse(isCollapse);
    },
    [],
  );

  const onLogout = React.useCallback(
    () => e => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch],
  );

  return {
    staff: userInfo,
    collapse,
    events: {
      onCollapse,
      onLogout,
    },
  };
}

export { useHooks };
