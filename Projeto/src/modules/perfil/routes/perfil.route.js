import express from "express";
import PerfilController from "../controllers/perfil.controller.js";

const router = express.Router();

// CADASTRAR PERFIL
router.post("/perfil/cadastrar", PerfilController.cadastrar);

// LISTAR PERFIL POR ID
router.get("/perfil/:id", PerfilController.listarPerfilId);

// LISTAR TODOS OS PERFIS
router.get("/perfis", PerfilController.listarTodos);

// BUSCAR PERFIL POR USER ID
router.get("/perfil/user/:user_id", PerfilController.BuscarPerfilPorUserId);

// ATUALIZAR PERFIL POR ID
router.patch("/perfil/atualizar/:id", PerfilController.atualizar);

// DELETAR PERFIL POR ID
router.delete("/perfil/deletar/:id", PerfilController.deletarPorId);

export default router;
