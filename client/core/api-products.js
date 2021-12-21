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

const remove = async (id) => {
  try {
    let response = await fetch('/api/product/' + id, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (id) => {
  try {
    let response = await fetch('/api/product/' + id, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listProducts, remove, read };
