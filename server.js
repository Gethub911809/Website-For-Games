const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let rooms = {};

io.on("connection", (socket) => {

    console.log("Player connected:", socket.id);

    socket.on("createRoom", () => {
        const code = Math.random().toString(36).substring(2, 7).toUpperCase();

        rooms[code] = {
            players: [socket.id],
            turn: 0
        };

        socket.join(code);

        socket.emit("roomCreated", code);
        socket.emit("yourTurn");

        console.log("Room created:", code);
    });

    socket.on("joinRoom", (code) => {
        if (!rooms[code]) {
            socket.emit("errorMessage", "Room not found");
            return;
        }

        rooms[code].players.push(socket.id);

        socket.join(code);

        io.to(code).emit("startGame");

        io.to(rooms[code].players[0]).emit("yourTurn");
        io.to(rooms[code].players[1]).emit("notYourTurn");
    });

    socket.on("move", ({ room, row, col, player }) => {
        socket.to(room).emit("moveMade", { row, col, player });

        const r = rooms[room];
        if (!r) return;

        r.turn = 1 - r.turn;

        const p1 = r.players[0];
        const p2 = r.players[1];

        io.to(p1).emit(r.turn === 0 ? "yourTurn" : "notYourTurn");
        io.to(p2).emit(r.turn === 1 ? "yourTurn" : "notYourTurn");
    });

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});