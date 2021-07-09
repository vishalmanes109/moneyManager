import React, { useEffect, useState } from "react";
import MiniDrawer from "../components/Drawer";
import { getTransactionById } from "../utilities/ApiService";
import Form from "../components/Form";
export default function UpdateTransaction({ transId }) {
  let transDatas = {
    title: "update",
    description: "update",
    amount: "50",
    date: "2021-01-03",
    mode_of_payment: "Debit",
    essential: "Yes",
    category_id: "1",
    currency_id: "1",
    transaction_type_id: "1",
  };
  let id = "CEG9r0tuuQ";
  let [transData, setTransData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        let result = await getTransactionById(id);
        let dd = result.date.substring(8, 10);
        let mm = result.date.substring(5, 7);
        let yyyy = result.date.substring(0, 4);

        let todayDate = mm + "/" + dd + "/" + yyyy;
        result.date = yyyy + "-" + mm + "-" + dd;

        setTransData(result);
        console.log("after set: ", result);
      } catch (error) {
        console.log("err: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      return{" "}
      <MiniDrawer
        props={
          <>
            <Form name="Update" transData={transData}></Form>
          </>
        }
      ></MiniDrawer>
      ;
    </>
  );
}
