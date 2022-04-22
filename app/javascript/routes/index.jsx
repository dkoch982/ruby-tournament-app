import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Tournament from "../components/Tournament";
import Players from "../components/Players"
import Player from "../components/Player"

export default (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/tournaments" element={<Home/>} />
            <Route path="/tournaments/:id" element={<Tournament/>} />
            <Route path="/players" element={<Players/>} />
            <Route path="/players/:id" element={<Player/>} />
        </Routes>
    </Router>
);
