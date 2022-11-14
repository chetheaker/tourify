const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUser = async () => {
  const user = await fetch(baseUrl + '/user', {
    method: 'GET',
    credentials: 'include'
  });
  const json = await user.json();
  return json;
};

export const getUserByTrip = async (id) => {
  const user = await fetch(baseUrl + '/get-user/' + id, {
    method: 'GET',
    credentials: 'include'
  });

  const json = await user.json();
  return json;
};

export const loginUser = async (user) => {
  const res = await fetch(baseUrl + '/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const json = await res.json();
  return json;
};

export const registerUser = async (user) => {
  try {
    const res = await fetch(baseUrl + '/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const json = await res.json();
    return json;
  } catch (e) {
    console.log('Error wioth register POST', e);
  }
};

export const logoutUser = async () => {
  const res = await fetch(baseUrl + '/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const json = await res.json();
  return json;
};

export const deleteUser = async () => {
  const res = await fetch(baseUrl + '/user', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const json = await res.json();
  return json;
};
