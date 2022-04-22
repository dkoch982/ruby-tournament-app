import { Table, Form, Input, Button, message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import AddTournamentModal from "./AddTournamentModal";

const Tournaments = () => {
    const formRef = React.createRef();
    const columns = [
        {
            title: "Tournament Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Course Name",
            dataIndex: "course_name",
            key: "course_name",
        },
        {
            title: "Date of Event",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <a href={"/tournaments/" + record.id} type="danger">
                    View{" "}
                </a>
            ),
        },
        {
            title: "",
            key: "action",
            render: (_text, record) => (
                <Popconfirm title="Are you sure you want to delete this tournament?" onConfirm={() => deleteTournament(record.id)} okText="Yes" cancelText="No">
                <a href="#" type="danger">
                    Delete{" "}
                </a>
                </Popconfirm>
            ),
        },
    ];

    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        loadTournaments();
    }, []);

    const loadTournaments = (eventDate=null) => {
        let url = "/api/v1/tournaments";
        if (eventDate) {
            url = (url + "?event_date=" + eventDate);
        }
        fetch(url)
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
            throw new Error("Network error.");
        })
        .then((data) => {
            let t = []
            data.forEach((tournament) => {
                const newEl = {
                    key: tournament.id,
                    id: tournament.id,
                    name: tournament.name,
                    course_name: tournament.course_name,
                    date: tournament.event_date,
                    num_players: 0,
                };
                t.push(newEl)
            });
            setTournaments(t);
        })
        .catch((err) => message.error("Error: " + err));
    };

    const reloadTournaments = (eventDate=null) => {
        setTournaments([]);
        loadTournaments(eventDate);
    };

    const deleteTournament = (id) => {
        const url = `api/v1/tournaments/${id}`;
        fetch(url, {
            method: "delete",
        })
        .then((data) => {
            if (data.ok) {
                reloadTournaments();
                return data.json();
            }
            throw new Error("Network error.");
        })
        .catch((err) => message.error("Error: " + err));
    };

    const onSearch = (values) => {
        reloadTournaments(values.event_date);
    }

    return (
        <>
            <Form ref={formRef} layout="horizontal" onFinish={onSearch} style={{ "maxWidth": "400px" }} >
                <Form.Item name="event_date" label="Event Date" rules={[{ required: false }]}>
                    <Input type="date" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Search</Button>
                </Form.Item>
            </Form>
            <Table className="table-striped-rows" dataSource={tournaments} columns={columns} pagination={{ pageSize: 10 }} />
            <AddTournamentModal reloadTournaments={reloadTournaments} />
        </>
    );

};

export default Tournaments;
