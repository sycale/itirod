import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { Layout } from "antd";

import "./App.css";
import Header from "./components/header";
import CreateTest from "./components/createTest";
import Test from "./components/test";
import Results from "./components/results";

function App() {
  return (
    <Router>
      <Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout>
          <Layout.Content>
            <Routes>
              <Route path="/">
                <Route exact path="create" element={<CreateTest />} />
                <Route exact path=":id" element={<Test />} />
                <Route exact path="results" element={<Results />} />
                <Route index element={<span>Home Page</span>}></Route>
              </Route>
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
