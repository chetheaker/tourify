const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUser = async () => {
  const user = await fetch(baseUrl + '/user', {
    method: 'GET',
    credentials: 'include'
  });
  const json = await user.json();
  return json;
};

export const getUserByEmail = async (email: string) => {
  const user = await fetch(baseUrl + '/user/' + email, {
    method: 'GET',
    credentials: 'include'
  });
  const json = await user.json();
  return json;
};

export const getUserByTrip = async (id: string) => {
  const user = await fetch(baseUrl + '/get-user/' + id, {
    method: 'GET',
    credentials: 'include'
  });

  const json = await user.json();
  return json;
};

export const loginUser = async (user: {
  email: string,
  password: string
}) => {
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

export const registerUser = async (user: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
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
