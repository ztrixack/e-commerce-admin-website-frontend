import { useState, useCallback } from 'react';
import { UserAPI } from 'api';
import { useAlert, usePost } from 'hooks';

function useHooks({ form, onNext }) {
  const alert = useAlert();
  const [dirty, setDirty] = useState(false);
  const [call, submitting] = usePost();

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

  const handleValidateToUsername = useCallback(
    () => async (rule, value, callback) => {
      const [result, err] = await call({
        api: UserAPI.exist,
        params: {
          username: value,
        },
      });

      if (err) {
        callback(err.message);
      } else if (result.exist) {
        callback('username is exist!');
      } else {
        callback();
      }
    },
    [call],
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

  const handleSubmit = useCallback(
    () => e => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (err) {
          alert.error('user is invalid');
          return;
        }

        if (onNext) {
          onNext(values);
        }
      });
    },
    [alert, form, onNext],
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
    submitting,
    events: {
      handleValidateToUsername,
      handleCompareToFirstPassword,
      handleValidateToNextPassword,
      handleConfirmBlur,
      handleSubmit,
    },
  };
}

export { useHooks };
