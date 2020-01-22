import { useState, useCallback } from 'react';
import { UserAPI } from 'api';
import { useAlert, usePost } from 'hooks';
import history from 'utils/history';

function useHooks({ form, user }) {
  const alert = useAlert();
  const [dirty, setDirty] = useState(false);

  const [call, updating] = usePost();

  const handleCompareToFirstPassword = useCallback(
    () => (rule, value, callback) => {
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    [form],
  );

  const handleValidateToNextPassword = useCallback(
    () => (rule, value, callback) => {
      if (value && dirty) {
        form.validateFields(['repassword'], { force: true });
      }
      callback();
    },
    [dirty, form],
  );

  const handleSave = useCallback(
    () => async values => {
      const [, err] = await call({
        api: UserAPI.changePassword,
        payload: {
          id: user.id,
          oldPassword: values.oldpassword,
          newPassword: values.password,
        },
      });

      if (err) {
        alert.error('Change password failed');
      } else {
        alert.info('Change password completed');
        history.push('../../users');
      }
    },
    [call, user, alert],
  );

  const handleConfirmBlur = useCallback(
    () => e => {
      e.preventDefault();

      setDirty(confirmDirty => confirmDirty || !!e.target.value);
    },
    [],
  );

  return {
    alert,
    updating,
    events: {
      handleCompareToFirstPassword,
      handleValidateToNextPassword,
      handleConfirmBlur,
      handleSave,
    },
  };
}

export { useHooks };
