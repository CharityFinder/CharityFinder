import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import favoriteRouter from "./routes/favorites";

dotenv.config();

(async () => {
  try {
    // Initialize express
    const app = express();
    const port = Number(process.env.PORT) || 8080;
    app.set("port", port);

    // Middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV !== "production") {
      app.use(logger("dev"));
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", `http://localhost:3000`);
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
      });
    }

    // Routes
    app.use("/api/favorites", favoriteRouter);

    app.get("/api", async (req, res) => {
      try {
        return res.json(
          `CharityFinder, the hassle free solution to solving your charity researching problems :D`
        );
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // Launch Server
    app.listen(port, () => {
      console.log(`📡 Server up! 📡 Listening on  http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
