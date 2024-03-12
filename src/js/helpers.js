import * as config from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const res = await Promise.race([(fetch(url), timeout(config.TIMEOUT_SEC))]);
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);

    // this catches and displays the error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    // const res = await Promise.race([(fetchPro, timeout(config.TIMEOUT_SEC))]);
    // const data = await res.json();
    const data = await fetchPro.json();

    // this catches and displays the error
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    if (!fetchPro.ok) throw new Error(`${data.message} (${fetchPro.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
