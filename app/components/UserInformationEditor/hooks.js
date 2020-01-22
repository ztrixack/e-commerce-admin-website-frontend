import { useCallback } from 'react';
import { UserAPI } from 'api';
import { useAlert, usePost } from 'hooks';
import history from 'utils/history';

function useHooks({ form, user }) {
  const alert = useAlert();
  const [call, updating] = usePost();

  const handleSubmit = useCallback(
    () => e => {
      e.preventDefault();

      form.validateFields(async (error, values) => {
        if (error) {
          alert.error('user is invalid');
          return;
        }

        const [, err] = await call({
          api: UserAPI.update,
          params: { id: user.id },
          payload: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            roles: values.roles,
          },
        });

        if (err) {
          alert.error('Update user is failed');
        } else {
          alert.info('Update user is completed');
          history.push('../../users');
        }
      });
    },
    [form, call, user, alert],
  );

  return {
    updating,
    user,
    alert,
    events: {
      handleSubmit,
    },
  };
}

export { useHooks };
