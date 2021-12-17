const listProducts = async () => {
  try {
    let response = await fetch('/api/products/', {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listProducts };
