const bodyParser = require("body-parser");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post("/user", (req, res, next) => {
  try {
    next();
  } catch (err) {
    const status = 401;
    const message = "Erro: access_token inválido";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server: http://localhost:3000");
});

server.use("/api", router);
