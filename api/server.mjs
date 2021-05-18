import express from "express";
import logger from "morgan";
import favoriteRouter from "./routes/favorites.mjs";
import statsRouter from "./routes/stats.mjs";
import interestRouter from "./routes/interests.mjs";
import thirdpartyRouter from "./routes/thirdparty.mjs";
import usersRouter from "./routes/users.mjs";
import donationsRouter from "./routes/donations.mjs";

(async () => {
  try {
    // Initialize express
    const app = express();
    const PORT = Number(process.env.PORT) || 8080;
    app.set("port", PORT);

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
    app.use("/favorites", favoriteRouter);
    app.use("/stats", statsRouter);
    app.use("/interests.mjs", interestRouter);
    app.use("/cn", thirdpartyRouter);
    app.use("/users", usersRouter);
    app.use("/donations", donationsRouter);

    app.get("", async (req, res) => {
      try {
        return res.json(
          `CharityFinder, the hassle free solution to solving your charity researching problems :D`
        );
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // Launch Server
    app.listen(PORT, () => {
      console.log(`📡 Server up! 📡 Listening on  http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
