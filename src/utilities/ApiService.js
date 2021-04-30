import axios from "axios";

// Tracker  Services

const getTotalTransactionForMonth = async (userId) => {
  let netTransactionData = {};
  let baseUrl = `http://localhost:3002/`;

  try {
    let url = baseUrl + "transaction/total/" + userId;
    // console.log(url);
    const response = await axios.get(url);

    netTransactionData = response.data.result;
  } catch (error) {
    console.error(error);
  }
  return netTransactionData;
};

const getRecentTransaction = async (userId) => {
  let recentTransactionData = {};
  let baseUrl = `http://localhost:3002/`;

  try {
    let url = baseUrl + "transaction/recent/" + userId;
    // console.log(url);
    const response = await axios.get(url);

    recentTransactionData = response.data.result;
  } catch (error) {
    console.error(error);
  }
  return recentTransactionData;
};

// User Services
const userRegistration = async (userData) => {
  // console.log(userData);
  let baseUrl = `http://localhost:3001/`;
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
export {
  getTotalTransactionForMonth,
  userRegistration,
  isUserNameAvailable,
  getRecentTransaction,
};
