import express, { Application } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import router from "./routes/route"

const app: Application = express()
const httpServer = createServer(app)

app.use(cors())
app.use(express.json())
app.use("/api/v1", router)

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})


io.on("connection", socket => {
  console.log(`user connected`)
})

app.get("/", (req, res) => {
  res.send("hello world")
})

httpServer.listen(4000, () => {
  console.log("app is listening")
})