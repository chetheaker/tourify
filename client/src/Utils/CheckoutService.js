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

  const json = await res.json();
  return json;
};
