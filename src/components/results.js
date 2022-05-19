import { Card } from "antd";
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
    <div className="container d-flex justify-content-center flex-column align-items-center">
      {!!results &&
        results.map((result) => (
          <Card title={result.name} bordered={false} style={{ width: 300 }}>
            <p>{result.score}</p>
          </Card>
        ))}
    </div>
  );
}
