import React from "react";

import { Layout } from "antd";

import "./App.css";
import Header from "./components/header";

function App() {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout>
        <Switch></Switch>
        <Layout.Content>Content</Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
