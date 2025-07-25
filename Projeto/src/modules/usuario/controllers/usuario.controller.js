import UsuarioModel from "../models/usuario.model.js";

export default class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, foto_perfil } = req.body;
      if (!nome || !email || !senha || !foto_perfil) {
        return res.status(400).json({ message: "Erro do Cliente." });
      }
      await UsuarioModel.create({ nome, email, senha, foto_perfil });
      res.status(201).json({ message: "Usuario Criado com Sucesso!!" });
    } catch (error) {
      res.status(500).json({
        message: "Erro interno do servidor!",
        erro: error.message,
      });
    }
  }
  static async listartodos(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll();
      if (usuarios.length === 0) {
        res.status(200).json({ message: "Banco Vazio!" });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({
        message: "Erro interno do servidor!",
        erro: error.message,
      });
    }
  }
  static async listarPorId(req, res) {
    try {
      const id = req.params.id;
      const usuario = await UsuarioModel.findByPk(id);
      if (!usuario) {
        res.status(404).json({ message: "Usuario não encontrado!" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({
        message: "Erro interno do servidor!",
        erro: error.message,
      });
    }
  }
  static async editar(){
    
  }
}
