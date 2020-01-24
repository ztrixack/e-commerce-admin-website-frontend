import React from 'react';

function useHooks() {
  const totalPrice = Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 10000),
  );
  const frontierOrders = Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 10),
  );
  const onlineOrders = Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 10),
  );
  const totalOrder = Array.from({ length: 24 }).map(
    (_, i) => frontierOrders[i] + onlineOrders[i],
  );

  return {
    totalPrice,
    frontierOrders,
    onlineOrders,
    totalOrder,
  };
}

export { useHooks };
