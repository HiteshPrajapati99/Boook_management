// 1 create contaxt
// 2 privder for provide dara
// 3 consumer for get data = usecontaxt hook

// imports

import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/BookReduser";

// data create

const Appcontext = createContext();

// api links
const url = "http://localhost:8000/getbooks";
const token = localStorage.getItem("x-access-token");

//  reducer

const inititleState = {
  isLoding: false,
  isError: false,
  book: [],
};

// functions create

const DataProvider = ({ children }) => {
  const [state, discpatch] = useReducer(reducer, inititleState);

  const getusers = async (url) => {
    discpatch({ type: "Loding_Data" });
    try {
      const res = await axios.get(url, {
        headers: { "x-access-token": token },
      });
      const book = res.data;
      discpatch({ type: "Data_Added_Api", payload: book });
    } catch (error) {
      discpatch({ type: "Api_Data_Error" });
    }
  };

  useEffect(() => {
    getusers(url);
  }, []);
  return (
    <Appcontext.Provider value={{ ...state }}> {children} </Appcontext.Provider>
  );
};

// create a custom hook

const useUserProvider = () => {
  return useContext(Appcontext);
};

export { DataProvider, Appcontext, useUserProvider };
