import express from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/usuarios", UsuarioController.listartodos);

router.get("/usuarios/:id", UsuarioController.listarPorId);

router.post("/usuarios/cadastrar", UsuarioController.cadastrar);

router.patch("/usuarios/atualizar/:id", UsuarioController.editar);

router.delete("/usuarios/deletar", UsuarioController.deletarTodos);

router.delete("/usuarios/deletar/:id", UsuarioController.deletarPorId);

export default router;
