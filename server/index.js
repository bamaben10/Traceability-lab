const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const controllerFile = require("./controller");

app.use(express.static("client"));
app.use(express.json());
app.use(cors());
// entry API point
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"))
})

app.get("/api/movies", controllerFile.getMovies);
app.delete("/api/movies/:id", controllerFile.deleteMovie);
app.post("/api/movies", controllerFile.createMovies);
app.put("/api/movies/:id", controllerFile.updateMovie);

const port = process.env.PORT || 4004;

app.listen(port, () => console.log(`running on 4004 ${port}`));
