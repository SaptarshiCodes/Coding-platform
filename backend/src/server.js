import express from "express"
import { ENV } from "./lib/env.js"

const PORT = ENV.PORT || 3000;

const app = express()

app.get("/", (req, res) => {
  res.status(200).json({message: "success from backend"})
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:/${PORT}`));