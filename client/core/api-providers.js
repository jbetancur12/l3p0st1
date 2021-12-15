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
  try {
    let response = await fetch(
      '/api/product/price/' + values.provider + '/' + values.category.name,
      {
        method: 'GET',
      },
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listProviders = async () => {
  try {
    let response = await fetch('/api/providers', {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {}
};

export { listProvidersByCategory, listPrices, listProviders };
