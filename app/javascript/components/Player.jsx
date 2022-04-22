import { Layout, Card, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import EditPlayerModal from "./EditPlayerModal";

const { Content, Footer } = Layout;

const Player = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState({});
    const [tournamentsRegistered, setTournamentsRegistered] = useState({ num_tournaments: 0, tournaments: [] });

    useEffect(() => {
        loadDetails();
    }, []);

    const loadDetails = async () => {
        fetchPlayer();
        fetchPlayerTournaments();
    }

    const fetchPlayer = async () => {
        const url = `/api/v1/players/${id}`;
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
            const p = {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                postal_code: data.postal_code,
                handicap: data.handicap,
            };
            setPlayer(p);
        } catch(err) {
            message.error("Error: " + err)
        }
        
    };

    const fetchPlayerTournaments = async () => {
        const url = `/api/v1/players/${id}/tournaments`;
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
                tournaments: data,
                num_tournaments: data.length
            };
            setTournamentsRegistered(r);
        } catch(err) {
            message.error("Error: " + err)
        }
    };

    const reloadPlayer = () => {
        setPlayer({});
        loadDetails();
    };

    return (
        <Card title={player.first_name + " " + player.last_name} style={{ "maxWidth": "600px" }}>
            <Card type="inner" title="First Name">{player.first_name}</Card>
            <Card type="inner" title="Last Name">{player.last_name}</Card>
            <Card type="inner" title="Postal Code">{player.postal_code}</Card>
            <Card type="inner" title="Handicap">{player.handicap}</Card>
            <Card type="inner" title="Tournaments" extra={tournamentsRegistered.num_tournaments}>
                {tournamentsRegistered.tournaments.map(t => (<div>{t.name} : {t.event_date}</div>))}
            </Card>
            <EditPlayerModal player={player} reload={reloadPlayer} />
        </Card>
    );
};

export default () => (
    <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "100px auto" }}>
                <h1>Player</h1>
                <Player />
            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Dan Koch 04-20-2022</Footer>
    </Layout>
);
