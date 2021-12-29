const list = async () => {
  try {
    let response = await fetch('/api/roles/', {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id) => {
  try {
    let response = await fetch('/api/role/' + id, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (id) => {
  console.log(id);
  try {
    let response = await fetch('/api/role/' + id, {
      method: 'GET',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { list, remove, read };
