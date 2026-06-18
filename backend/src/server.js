import express from "express";
import path from "path";
import cors from "cors";

import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express"
import { inngest, functions } from "./lib/inngest.js";

const PORT = ENV.PORT || 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
// credentials:true means seerver allows browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({client: inngest, functions}))

app.get("/", (req, res) => {
  res.status(200).json({ message: "success from backend" });
});

const frontendPath = path.resolve(__dirname, "../../frontend/dist");

if (ENV.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:/${PORT}`),
    );
  } catch (error) {
    console.eror("❌ Error starting the server", error);
  }
};

startServer();
