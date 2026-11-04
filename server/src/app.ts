import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import contractRoutes from "./routes/contract.routes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contracts", contractRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "PactPay AI Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
