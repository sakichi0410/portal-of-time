const httpGet = async function (url) {
  console.log("index.js httpGet 1");
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    console.log("index.js httpGet 2");
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { httpGet }