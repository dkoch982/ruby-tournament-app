import { Layout } from "antd";
import React from "react";
import Tournaments from "./Tournaments";
import Header from "./Header";

const { Content, Footer } = Layout;

export default () => (
    <Layout className="layout">
        <Header />
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content" style={{ margin: "100px auto" }}>
                    <h1>Tournament List</h1>
                    <Tournaments />
                </div>
            </Content>
        <Footer style={{ textAlign: "center" }}>Dan Koch 04-20-2022</Footer>
    </Layout>
);
