import express from "express";
import bodyparser from "body-parser";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();
// import usersRouter from "./routes/users";

(async () => {
  try {
    // Initialize express
    const app = express();
    const port = Number(process.env.PORT) || 8080;
    app.set("port", port);

    // Middleware
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.json());

    if (process.env.NODE_ENV !== "production") {
      app.use(logger("dev"));
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", `http://localhost:3000`);
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
      });
    }

    // Importing Routes
    // app.use("/api/users", usersRouter);

    // Routes
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
