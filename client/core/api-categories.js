const list = async () => {
  try {
    let response = await fetch('/api/categories/', {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getPrice = async (query) => {

  try {
    let response = await fetch('/api/product/' + query, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id) => {
  try {
    let response = await fetch('/api/category/' + id, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};



export { list, getPrice, remove };
