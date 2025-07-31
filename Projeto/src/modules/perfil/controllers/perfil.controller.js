import PerfilModel from "../models/perfil.model.js";

export default class PerfilController {
  static async cadastrar(req, res) {
    try {
      const { bio, site_pessoal, data_nascimento } = req.body;

      if (!bio || !site_pessoal || !data_nascimento) {
        return res.status(400).json({ message: "Erro do cliente." });
      }

      const profile = await PerfilModel.create({
        bio,
        site_pessoal,
        data_nascimento,
      });
      res
        .status(201)
        .json({ message: "Perfil criado com sucesso!", profile: profile });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro interno do servidor. Por favor, tente mais tarde",
          erro: error.message,
        });
    }
  }

  static async listarPerfilId(req, res) {
    try {
      const id = req.params.id;
      const profile = await PerfilModel.findByPk(id);

      if (!profile) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }

      res.status(200).json(profile);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro interno do servidor. Por favor, tente mais tarde",
          erro: error.message,
        });
    }
  }

  static async listarTodos(req, res) {
    try {
      const profiles = await PerfilModel.findAll();

      if (profiles.length === 0) {
        return res.status(404).json({ message: "Nenhum perfil encontrado." });
      }

      res.status(200).json(profiles);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro interno do servidor. Por favor, tente mais tarde",
          erro: error.message,
        });
    }
  }

  static async BuscarPerfilPorUserId(req, res) {
    try {
      const userId = req.params.user_id;
      const perfil = await PerfilModel.findOne({ where: { userId } });

      if (!perfil) {
        return res
          .status(404)
          .json({ message: "Perfil não encontrado para este usuário." });
      }

      res.status(200).json(perfil);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro interno do servidor. Por favor, tente mais tarde",
          erro: error.message,
        });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = req.params.id;
      const { bio, site_pessoal, data_nascimento } = req.body;
      const perfil = await PerfilModel.update(
        { bio, site_pessoal, data_nascimento },
        { where: { id } }
      );

      if (!perfil || perfil.length === 0) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }

      perfil.bio = bio || perfil.bio;
      perfil.site_pessoal = site_pessoal || perfil.site_pessoal;
      perfil.data_nascimento = data_nascimento || perfil.data_nascimento;

      res.status(200).json({ message: "Perfil atualizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro interno do servidor. Por favor, tente mais tarde",
          erro: error.message,
        });
    }
  }

  static async deletarPorId(req, res) {
    try {
      const id = req.params.id;
      const profile = await PerfilModel.destroy({ where: { id } });

      if (!profile) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }

      res.status(200).json({ message: "Perfil deletado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erro interno do servidor. Por favor, tente mais tarde",
          erro: error.message,
        });
    }
  }
}
