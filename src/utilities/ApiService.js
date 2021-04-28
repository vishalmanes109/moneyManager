import axios from "axios";

const getTotalTransactionForMonth = async (userId) => {
  let netTransactionData;
  let baseUrl = `http://localhost:3005/`;
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
export { getTotalTransactionForMonth };
