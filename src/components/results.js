import React, { useEffect, useState } from "react";
import Api from "../api/api";

export default function Results() {
  const [results, setResults] = useState();
  useEffect(() => {
    const fetchResults = async () => {
      const data = await Api.getResults();
      const json = await data.json();
      console.log(json);
      setResults(json);
    };

    fetchResults();
  }, []);
  return (
    <div>
      {!!results &&
        results.map((result) => (
          <div>
            <span>
              {result.name} - {result.score}
            </span>
          </div>
        ))}
    </div>
  );
}
