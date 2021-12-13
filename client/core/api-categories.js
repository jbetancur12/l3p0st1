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
  const ll = 100
  try {
    let response = await fetch('/api/product/' + query, {
      method: 'GET',

    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export { list, getPrice }