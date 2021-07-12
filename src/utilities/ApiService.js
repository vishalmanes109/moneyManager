import axios from "axios";

//--------------------------------------- Tracker  Services----------------------------

const getTotalTransactionForMonth = async (userId) => {
  let netTransactionData = {};
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  try {
    let url = baseUrl + "transaction/total/" + userId;
    // console.log(url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    netTransactionData = response.data.result;
    console.log(netTransactionData);
  } catch (error) {
    console.error(error);
  }
  return netTransactionData;
};

const getRecentTransaction = async (userId) => {
  let recentTransactionData = {};
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");

  try {
    let url = baseUrl + "transaction/recent/" + userId;
    // console.log(url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    recentTransactionData = response.data.result;
    console.log("recentTransactionData api", recentTransactionData);
  } catch (error) {
    console.log(error);
  }
  return recentTransactionData;
};
const addTrasaction = async (transactionData) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response;
  try {
    let url = baseUrl + "transaction";
    // console.log(url);
    response = await axios.post(url, transactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
    response.error = true;
    return response;
  }
  return response;
};
const deleteTransaction = async (transactionId) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response;
  try {
    let url = baseUrl + `transaction/id${transactionId}`;
    // console.log(url);
    response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
    response.error = true;
    return response;
  }
  return response;
};
const updateTransaction = async (transactionData, attribute) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response;
  try {
    let url = baseUrl + "transaction";
    let updateData = transactionData;
    updateData.attribute = attribute;
    console.log(updateData);
    response = await axios.patch(url, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response:", response);
  } catch (error) {
    console.log(error);
    response.error = true;
    return response;
  }
  return response;
};

const getTransactionByAttribute = async (attribute, value) => {
  console.log(attribute, value);
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userid");
  let response;
  let url;
  try {
    url =
      baseUrl +
      `transaction?id=${userId}&attribute=${attribute}&value=${value}`;
    // console.log(url);
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  } catch (error) {
    console.log(error);

    response.error = true;
    return response;
  }
  return response;
};
const getTransactionByPeriod = async (start, end) => {
  console.log(start, end);
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userid");
  let response;
  let url;
  try {
    url = baseUrl + `transaction?id=${userId}&start=${start}&end=${end}`;

    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  } catch (error) {
    console.log(error);

    response.error = true;
    return response;
  }
  return response;
};

const getTransactionById = async (transactionId) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response, result;
  try {
    let url = baseUrl + `transaction/id/${transactionId}`;
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    result = await response.data.result[0];
    // console.log(result);
  } catch (error) {
    console.log(error);
    result.error = true;
    return result;
  }
  return result;
};

// ---------------------------------Stats Service -------------------------------------------
const getChartData = async (userId, chart, filter) => {
  let chartData = {};
  let baseUrl = `http://localhost:3003/`;
  let token = localStorage.getItem("token");

  try {
    let url =
      baseUrl + `stats/chart?user_id=${userId}&chart=${chart}&filter=${filter}`;
    // console.log(url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    chartData = response.data.result;
    // console.log(chartData);
  } catch (error) {
    console.error(error);
  }
  return chartData;
};

const getAllChartData = async (userId) => {
  // by default when component did mount get all chart data
  let pie = await getChartData(userId, "pie", "transaction_type");
  let bar = await getChartData(userId, "bar", "expense");
  let line = await getChartData(userId, "line", "expense");
  let allChartData = { pie, bar, line };
  console.log(allChartData);
  return allChartData;
};
//---------------------------------- User Services ----------------------------------
const userRegistration = async (userData) => {
  // console.log(userData);
  let baseUrl = `http://localhost:3001/`;
  // by default add currency as indian (5 is mapped to RS) theme to light user can change this from profile
  userData = { ...userData, avatar: "avatar", currency_id: 5, theme: "light" };
  // console.log(userData);
  let registrationResult = {};
  try {
    let url = baseUrl + "user";
    const response = await axios.post(url, userData);
    console.log("response:", response);
    registrationResult = response;

    console.log("registrationResult:", registrationResult.status);
  } catch (error) {
    console.error("error:", error);
  }
  return registrationResult;
};

const userLogin = async (userData) => {
  // console.log(userData);
  let baseUrl = `http://localhost:3001/`;
  // console.log(userData);
  let loginResult = {};
  try {
    let url = baseUrl + "user/login";
    const response = await axios.post(url, userData);
    console.log("response:", response);
    loginResult = response;

    console.log("registrationResult:", loginResult.data.token);
  } catch (error) {
    console.log("error logging:", error);
    if (error === "Error: Network Error") console.log("net err conta");
  }
  return loginResult;
};

const isUserNameAvailable = async (userName) => {
  console.log(userName);
  let baseUrl = `http://localhost:3001/`;
  let result = {};
  try {
    let url = baseUrl + `user/username/${userName}`;
    const response = await axios.get(url);
    console.log("response:", response);
    result = response.data;
    console.log("registrationResult:", result);
  } catch (error) {
    console.error("error:", error);
  }
  return result;
};

const getSetting = async (userId) => {
  let baseUrl = `http://localhost:3001/`;
  let token = localStorage.getItem("token");
  let response, result;
  try {
    let url = baseUrl + `user/id/${userId}`;
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    result = await response.data.result[0];
    // console.log(result);
  } catch (error) {
    console.log(error);
    result.error = true;
    return result;
  }
  return result;
};

export {
  getTotalTransactionForMonth,
  addTrasaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByAttribute,
  getTransactionByPeriod,
  userRegistration,
  isUserNameAvailable,
  getRecentTransaction,
  userLogin,
  getSetting,
  getChartData,
  getAllChartData,
};
