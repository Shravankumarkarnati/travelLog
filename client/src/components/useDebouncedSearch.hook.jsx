import { useContext } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";
import PopUpContext from "../utils/context";

const useDebouncedSearch = (searchFunction) => {
  const { context, changeContext } = useContext(PopUpContext);
  const inputText = context.search.inputText;
  const setInputText = (text) => {
    changeContext({
      ...context,
      search: {
        ...context.search,
        inputText: text,
      },
    });
  };
  let searchResults = context.search.results;

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 1000)
  );

  searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return [];
    } else {
      return debouncedSearchFunction(inputText);
    }
  }, [debouncedSearchFunction, inputText]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedSearch;
