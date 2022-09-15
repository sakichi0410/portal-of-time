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

const httpPost = async function (url, data) {
  console.log("index.js httpPost 1");
  try {
    const response = await fetch(url, {
      method: "POST", // POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("index.js httpPost 2");
    return response.json(); // JSON のレスポンスを JavaScript のオブジェクトに変換
  } catch (err) {
    //console.log(err);
  }
};

export { httpGet ,httpPost}