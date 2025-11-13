import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import clientRoute from "./routes/clientRoute.js";
import lawyerRoute from "./routes/lawyerRoute.js";
import caseRoute from "./routes/caseRoute.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-court-frontend.vercel.app/"],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "20kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/clients", clientRoute);
app.use("/api/v1/lawyers", lawyerRoute);
app.use("/api/v1/cases", caseRoute);

export { app };
