import axios from "axios";
import UsuarioModel from "../models/endereco.model.js";
import EnderecoModel from "../models/endereco.model.js";

class UsuarioController {
  // Cadastrar
  static async cadastrar(req, res) {
    try {
      const { user_id, cep, numero } = req.body;
      if (!user_id || !cep || !numero) {
        return res
          .status(400)
          .json({ mensagem: "id do Usuario, cep e rua são obrigatórios!" });
      }
      const usuario = await UsuarioModel.findByPk(user_id);
      if (!usuario) {
        return res.status(400).json({
          message: "Usuario não Econtrado!!",
        });
      }
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      res.status(201).json(resposta.data);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar todos
  static async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll();
      if (!usuarios || usuarios.length === 0) {
        return res.status(200).json({ mensagem: "Banco de dados vazio!" });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Atualizar por ID
  static async atualizar(req, res) {
    try {
      const { nome, email, senha, foto_perfil } = req.body;
      const { id } = req.params;
      const resultado = await UsuarioModel.update(
        { nome, email, senha, foto_perfil },
        { where: { id } }
      );
      if (!resultado === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await UsuarioModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json({ mensagem: "Usuário excluído com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar todos
  static async deletarTodos(req, res) {
    try {
      await UsuarioModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os usuários foram deletados!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Contar total de usuários
  static async totalUsuarios(req, res) {
    try {
      const total = await UsuarioModel.count();
      res.status(200).json({ total });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default UsuarioController;
