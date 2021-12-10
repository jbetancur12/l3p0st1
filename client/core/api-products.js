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

export { list }