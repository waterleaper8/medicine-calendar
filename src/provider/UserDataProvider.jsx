import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [uid, setUid] = useState("");
  const [checkedTimes, setCheckedTimes] = useState([false, false, false]);

  return (
    <UserDataContext.Provider
      value={{ uid, setUid, checkedTimes, setCheckedTimes }}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};
