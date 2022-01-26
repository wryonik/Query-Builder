import { useState } from "react";
import "./App.css";
import Button from "./components/common/Button";
import QueryBuilder from "./components/QueryBuilder";
import { IRuleGroup } from "./components/types";
import CopyIcon from "./assets/copy.svg";
import { filtersConfig } from "config";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [queryString, setQueryString] = useState<string>("");
  const [query, setQuery] = useState<IRuleGroup[]>([]);

  console.log(query)

  const handleClose = () => setShowModal(false);

  const handleFinish = (queryStr: string, queryArr: IRuleGroup[]) => {
    setShowModal(false);
    setQueryString(queryStr);
    setQuery(queryArr);
  };

  return (
    <>
      <div className="App">
        {showModal ? (
          <QueryBuilder filtersConfig={filtersConfig} handleClose={handleClose} handleFinish={handleFinish} />
        ) : (
          <div className="flex flex-col items-center">
            {queryString ? (
              <div className="mb-6 flex p-4 text-lg flex-row justify-center bg-selectFieldGrey rounded">
                {queryString}
                <img
                  src={CopyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(queryString);
                    alert("Query String copied to clipboard");
                  }}
                  className="h-6 w-6 ml-8"
                  alt={"copy"}
                />
              </div>
            ) : null}
            <Button
              label={queryString ? "Build new query" : "Open Query Builder"}
              onClick={() => setShowModal(true)}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
