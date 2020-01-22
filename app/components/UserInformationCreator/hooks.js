import { useCallback } from 'react';
import { useAlert } from 'hooks';

function useHooks({ form, onPrevious, onComplete }) {
  const alert = useAlert();

  const handleBack = useCallback(
    () => e => {
      e.preventDefault();

      if (onPrevious) {
        onPrevious();
      }
    },
    [onPrevious],
  );

  const handleSubmit = useCallback(
    () => e => {
      e.preventDefault();

      form.validateFields((error, values) => {
        if (error) {
          alert.error('user is invalid');
          return;
        }

        if (onComplete) {
          onComplete(values);
        }
      });
    },
    [alert, form, onComplete],
  );

  return {
    alert,
    events: {
      handleBack,
      handleSubmit,
    },
  };
}

export { useHooks };
