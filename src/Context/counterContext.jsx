/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export let counterContext = createContext();
export default function CreateCounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  function changeCounter() {
    let second=counter;
    second++;
    setCounter(second);
  }
  return (
    <counterContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </counterContext.Provider>
  );
}
