import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export default () => (
    <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Link to="/"><Menu.Item key="1">Tournaments</Menu.Item></Link>
            <Link to="/players"><Menu.Item key="2">Players</Menu.Item></Link>
        </Menu>
    </Header>
);
