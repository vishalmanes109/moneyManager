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

  return (
    <>
      return{" "}
      <MiniDrawer
        props={
          <>
            <Form name="Update" transid={id}></Form>
          </>
        }
      ></MiniDrawer>
      ;
    </>
  );
}
