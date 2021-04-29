import axios from "axios";

const getTotalTransactionForMonth = async (userId) => {
  let netTransactionData = {};
  let baseUrl = `http://localhost:3002/`;

  try {
    let url = baseUrl + "transaction/total/" + userId;
    console.log(url);
    const response = await axios.get(url);

    netTransactionData = response.data.result;
  } catch (error) {
    console.error(error);
  }
  return netTransactionData;
};

const userRegistration = async (userData) => {
  console.log(userData);
  let baseUrl = `http://localhost:3001/`;
  userData = { ...userData, avatar: "avatar", currency_id: 5, theme: true };
  console.log(userData);

  let registrationResult = {};
  try {
    let url = baseUrl + "user";
    console.log(url);
    const response = await axios.post(url, userData);
    console.log("response:", response);
    registrationResult = response.data;
    console.log("registrationResult:", registrationResult);
  } catch (error) {
    console.error("error:", error);
  }
  return registrationResult;
};

export { getTotalTransactionForMonth, userRegistration };
