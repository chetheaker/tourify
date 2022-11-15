const baseUrl = process.env.REACT_APP_BASE_URL;

export const createCheckoutSession = async () => {
  const res = await fetch(baseUrl + '/checkout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      items: [{ id: 'price_1M4MZeGsIQQOt2gpVjyaZI0N', quantity: 1 }]
    })
  });
  // priceID is currently in test mode

  const json = await res.json();
  return json;
};

export const authenticateCheckoutSession = async (session_id) => {
  const res = await fetch(baseUrl + '/success/auth', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      session_id: session_id
    })
  });

  const json = await res.json();
  return json;
};
