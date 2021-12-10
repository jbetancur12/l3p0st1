const list = async () => {
  try {
    let response = await fetch('/api/providers/', {
      method: 'GET',

    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { list }