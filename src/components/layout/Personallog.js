import React from "react";
import { Provider } from "./context";
import PersonalData from "./personaldata/PersonalData";

function Personallog() {
  return (
    <Provider>
      <PersonalData />
    </Provider>
  );
}

export default Personallog;
