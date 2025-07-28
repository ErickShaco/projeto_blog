import express from "express";

import routeUsuario from "./src/modules/usuario/routes/usuario.route.js";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(routeUsuario);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão realizada com sucesso!");
    await sequelize.sync({ force: false, alter: false });
    console.log("Tabela usuarios criada com sucesso.");
    console.log(`Servidor rodando na porta ${port}`);
  } catch (error) {
    console.log("Erro ao abrir o servidor", (error = error.message));
  }
});
