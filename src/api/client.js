// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

// YOU TOOK THIS 100% FROM THE REDUX TUTORIAL THAT TOOK IT FROM ABOVE

export async function client(endpoint, { body, method, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const urlBeginning = "http://localhost:8000";
    const response = await window.fetch(urlBeginning + endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body: body, method: "POST" });
};

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body: body, method: "PUT" });
};

client.delete = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
