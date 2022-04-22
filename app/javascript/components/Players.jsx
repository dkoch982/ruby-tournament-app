import { Layout } from "antd";
import { Table, message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddPlayerModal from "./AddPlayerModal";

const { Content, Footer } = Layout;

const Players = () => {
    const columns = [
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: "Postal Code",
            dataIndex: "postal_code",
            key: "postal_code",
        },
        {
            title: "Handicap",
            dataIndex: "handicap",
            key: "handicap",
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <a href={"/players/" + record.id} type="danger">
                    View{" "}
                </a>
            ),
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <Popconfirm title="Are you sure you want to delete this player?" onConfirm={() => deletePlayer(record.id)} okText="Yes" cancelText="No">
                <a href="#" type="danger">
                    Delete{" "}
                </a>
                </Popconfirm>
            ),
        },
    ];

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = () => {
        const url = "api/v1/players";
        fetch(url)
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            let p = []
            data.forEach((player) => {
                const newEl = {
                    key: player.id,
                    id: player.id,
                    first_name: player.first_name,
                    last_name: player.last_name,
                    postal_code: player.postal_code,
                    handicap: player.handicap,
                };
                p.push(newEl)
            });
            setPlayers(p);
        })
        .catch((err) => message.error("Error: " + err));
    };

    const reloadPlayers = () => {
        setPlayers([]);
        loadPlayers();
    };

    const deletePlayer = (id) => {
        const url = `api/v1/players/${id}`;
    
        fetch(url, {
          method: "delete",
        })
          .then((data) => {
            if (data.ok) {
              reloadPlayers();
              return data.json();
            }
            throw new Error("Network error.");
          })
          .catch((err) => message.error("Error: " + err));
      };

    return (
        <>
            <Table className="table-striped-rows" dataSource={players} columns={columns} pagination={{ pageSize: 10 }} />

            <AddPlayerModal reloadPlayers={reloadPlayers} />
        </>
    );

};

export default () => (
    <Layout className="layout">
        <Header />
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content" style={{ margin: "100px auto" }}>
                    <h1>Player List</h1>
                    <Players />
                </div>
            </Content>
        <Footer style={{ textAlign: "center" }}>Dan Koch 04-20-2022</Footer>
    </Layout>
);
