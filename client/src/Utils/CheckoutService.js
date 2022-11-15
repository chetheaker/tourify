const baseUrl = process.env.REACT_APP_BASE_URL;

export const createCheckoutSession = async () => {
  const res = await fetch(baseUrl + '/checkout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      items: [{ id: 1, quantity: 1 }]
    })
  });

  if (res.ok) {
    const json = await res.json();
    const { url } = json;
    window.location = url;
  } else {
    const json = await res.json();
    return json;
  }
};
