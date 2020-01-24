import { useState, useCallback } from 'react';
import { useAlert } from 'hooks';

function useHooks({ form, onPrevious, onComplete }) {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      form.validateFields((error, values) => {
        if (error) {
          alert.error('user is invalid');
          setLoading(false);
          return;
        }

        if (onComplete) {
          onComplete(values);
        }
        setLoading(false);
      });
    },
    [alert, form, onComplete],
  );

  return {
    alert,
    loading,
    events: {
      handleBack,
      handleSubmit,
    },
  };
}

export { useHooks };
