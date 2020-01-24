import { useState, useCallback } from 'react';

function useHooks({ columns, dataSource, onAdd, onEdit, onDelete }) {
  const ds = (dataSource || []).map(d => Object.assign(d, { key: d.id }));
  const [data, setData] = useState(ds);
  const [loading, setLoading] = useState(false);

  const handleAdd = useCallback(
    () => async () => {
      if (onAdd) {
        await onAdd();
      }
    },
    [onAdd],
  );

  const handleEdit = useCallback(
    key => async () => {
      if (onEdit) {
        await onEdit(key);
      }
    },
    [onEdit],
  );

  const handleRemove = useCallback(
    key => async () => {
      setLoading(true);
      if (onDelete) {
        const success = await onDelete(key);

        if (success) {
          setData(data.filter(item => item.key !== key));
        }
      }
      setLoading(false);
    },
    [data, onDelete],
  );

  return {
    data,
    columns,
    loading,
    events: {
      handleAdd,
      handleEdit,
      handleRemove,
    },
  };
}

export { useHooks };
