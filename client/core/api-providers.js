const listProvidersByCategory = async (id) => {
  try {
    let response = await fetch('/api/category/' + id, {
      method: 'GET',

    });
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listProvidersByCategory }