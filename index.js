const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const socket = require("socket.io")

app.use(express.static('./client/build'))

app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const io = socket(server)

io.on("connection", (socket) => {
    console.log("socket created")

    socket.on("click", (data) => {
        socket.broadcast.emit("someoneClicked", data)
        socket.emit("senderConfirmation", "message sent")
    })
})