import { Layout, Card, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import EditTournamentModal from "./EditTournamentModal";

const { Content, Footer } = Layout;

const Tournament = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState({});
    const [registered, setRegistered] = useState({ num_players: 0, players: [] });

    useEffect(() => {
        loadDetails();
    }, []);

    const loadDetails = async () => {
        fetchTournament();
        fetchRegisteredPlayers();
    }

    const fetchTournament = async () => {
        const url = `/api/v1/tournaments/${id}`;
        try {
            let response = await fetch(url, {
                headers : {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            let data = await response.clone().json();
            const t = {
                id: data.id,
                name: data.name,
                course_name: data.course_name,
                event_date: data.event_date
            };
            setTournament(t);
        } catch(err) {
            message.error("Error: " + err)
        }
        
    };

    const fetchRegisteredPlayers = async () => {
        const url = `/api/v1/tournaments/${id}/players`;
        try {
            let response = await fetch(url, {
                headers : {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            let data = await response.clone().json();
            let r = {
                players: data,
                num_players: data.length
            };
            setRegistered(r);
        } catch(err) {
            message.error("Error: " + err)
        }
    };

    const reloadTournament = () => {
        setTournament({});
        setRegistered({ num_players: 0, players: [] });
        loadDetails();
    };

    return (
        <Card title={tournament.name} style={{ "maxWidth": "600px" }}>
            <Card type="inner" title="Tournament Location">{tournament.course_name}</Card>
            <Card type="inner" title="Tournament Date">{tournament.event_date}</Card>
            <Card type="inner" title="Registered Players" extra={registered.num_players}>
                {registered.num_players == 0 ? <div>None</div> : registered.players.map(p => (<div>{p.first_name} {p.last_name}</div>))}
            </Card>
            <EditTournamentModal tournament={tournament} reload={reloadTournament} />
        </Card>
    );
};

export default () => (
    <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
                <h1>Tournament</h1>
                <Tournament />
            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Dan Koch 04-20-2022</Footer>
    </Layout>
);
