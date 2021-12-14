const listProvidersByCategory = async (id) => {
  try {
    let response = await fetch('/api/category/' + id, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listPrices = async (values) => {
  console.log(values);
  try {
    let response = await fetch(
      '/api/product/price/' + values.provider + '/' + values.category.name,
      {
        method: 'GET',
      },
    );
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listProvidersByCategory, listPrices };
