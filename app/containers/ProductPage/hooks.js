function useHooks() {
  const dataSource = [
    {
      id: 1,
      image: 'image_url',
      name: 'maw',
      price: 100,
      hidden: false,
    },
    {
      id: 2,
      image: 'image_url',
      name: 'katai',
      price: 200,
      hidden: false,
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Show',
      dataIndex: 'hidden',
      key: 'hidden',
      render: hidden => (!hidden).toString(),
    },
  ];

  return {
    dataSource,
    columns,
  };
}

export { useHooks };
