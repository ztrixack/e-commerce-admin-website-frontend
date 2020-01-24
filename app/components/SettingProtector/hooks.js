import { useState, useMemo, useCallback } from 'react';
import { useAlert } from 'hooks';

function useHooks({ form, title, loading, onSave }) {
  const alert = useAlert();
  const [active, setActive] = useState(false);
  const key = useMemo(() => title.toLowerCase().replace(' ', '-'), [title]);

  const handleChange = useCallback(
    isActive => e => {
      e.preventDefault();
      setActive(isActive);
    },
    [],
  );

  const handleSubmit = useCallback(
    () => e => {
      e.preventDefault();

      form.validateFields((error, values) => {
        if (error) {
          alert.error('user is invalid');
          return;
        }

        if (onSave) {
          onSave(values);
        }
      });
    },
    [alert, form, onSave],
  );

  return {
    key,
    active,
    alert,
    loading,
    events: {
      handleChange,
      handleSubmit,
    },
  };
}

export { useHooks };
