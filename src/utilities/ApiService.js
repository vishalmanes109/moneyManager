import axios from "axios";

//--------------------------------------- Tracker  Services----------------------------

const getTotalTransactionForMonth = async (userId) => {
  let netTransactionData = {};
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response = {};
  try {
    let url = baseUrl + "transaction/total/" + userId;
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    netTransactionData = response.data.result;
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return netTransactionData;
};

const getRecentTransaction = async (userId) => {
  let recentTransactionData = {};
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response = {};
  try {
    let url = baseUrl + "transaction/recent/" + userId;
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    recentTransactionData = response.data.result;
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return recentTransactionData;
};
const addTrasaction = async (transactionData) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let response;
  try {
    let url = baseUrl + "transaction";
    //
    response = await axios.post(url, transactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return response;
};
const deleteTransaction = async (transactionId) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userid");
  let response;
  try {
    let url =
      baseUrl + `transaction?transaction_id=${transactionId}&user_id=${userId}`;
    //
    response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
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

    response = await axios.patch(url, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return response;
};

const getTransactionByAttribute = async (attribute, value) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userid");
  let response = {};
  let url;
  try {
    url =
      baseUrl +
      `transaction?id=${userId}&attribute=${attribute}&value=${value}`;
    //
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }

    return response;
  }
  return response;
};
const getTransactionByPeriod = async (start, end) => {
  let baseUrl = `http://localhost:3002/`;
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userid");
  let response = {};
  let url;
  try {
    url = baseUrl + `transaction/period?id=${userId}&start=${start}&end=${end}`;

    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
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
    //
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return result;
};

// ---------------------------------Stats Service -------------------------------------------
const getChartData = async (userId, chart, filter) => {
  let chartData = {};
  let baseUrl = `http://localhost:3003/`;
  let token = localStorage.getItem("token");
  let response = {};

  try {
    let url =
      baseUrl + `stats/chart?user_id=${userId}&chart=${chart}&filter=${filter}`;
    //
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    chartData = response.data.result;
    //
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return chartData;
};

const getAllChartData = async (userId) => {
  // by default when component did mount get all chart data
  let pie = await getChartData(userId, "pie", "transaction_type");
  let bar = await getChartData(userId, "bar", "expense");
  let line = await getChartData(userId, "line", "expense");
  let allChartData = { pie, bar, line };

  return allChartData;
};
//---------------------------------- User Services ----------------------------------
const userRegistration = async (userData) => {
  //
  let baseUrl = `http://localhost:3001/`;
  // by default add currency as indian (5 is mapped to RS) theme to light user can change this from profile
  userData = { ...userData, avatar: "avatar", currency_id: 5, theme: "light" };
  //
  let response = {};
  let registrationResult = {};
  try {
    let url = baseUrl + "user";
    response = await axios.post(url, userData);

    registrationResult = response;
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
  }
  return registrationResult;
};

const userLogin = async (userData) => {
  //
  let baseUrl = `http://localhost:3001/`;
  //
  let loginResult = {};
  try {
    let url = baseUrl + "user/login";
    const response = await axios.post(url, userData);

    loginResult = response;
  } catch (error) {
    if (error === "Error: Network Error") {
      console.log(error);
    }
  }
  return loginResult;
};

const isUserNameAvailable = async (userName) => {
  let baseUrl = `http://localhost:3001/`;
  let result = {};
  try {
    let url = baseUrl + `user/username/${userName}`;
    const response = await axios.get(url);

    result = response.data;
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
    //
  } catch (error) {
    result.error = true;
    return result;
  }
  return result;
};

const getUserById = async (userId) => {
  let baseUrl = `http://localhost:3001/`;
  let token = localStorage.getItem("token");
  let response = {};
  let result = [];
  try {
    let url = baseUrl + `user/id/${userId}`;
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    result = await response.data.result[0];
    //
  } catch (error) {
    if (error.response.status === 400) {
      response.status = 400;
    } else if (error.response.status === 500) {
      response.status = 500;
    } else if (error.response.status === 401) {
      response.status = 401;
    }
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
  getUserById,
  getChartData,
  getAllChartData,
};
