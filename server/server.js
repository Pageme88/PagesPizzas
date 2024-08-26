import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnect from "./config/mongoose.config.js"
import OrderRouter from "./routes/orders.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT 

app.use(express.json(), cors())
app.use("/api", OrderRouter)

dbConnect()

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
