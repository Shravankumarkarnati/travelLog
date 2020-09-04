import { createContext } from "react";

const PopUpContext = createContext({
  current: {
    content: null,
    edit: false,
  },
  allLogs: null,
  active: 2,
  data: {
    cord: null,
    suggest: null,
  },
  search: {
    inputText: "",
    results: null,
  },
  tempLocation: null,
});

export default PopUpContext;
