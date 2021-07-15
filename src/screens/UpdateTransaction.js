import React, { useEffect, useState } from "react";
import MiniDrawer from "../components/Drawer";
import Form from "../components/Form";
export default function UpdateTransaction(props) {
  let id = props.location.state.id;
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
