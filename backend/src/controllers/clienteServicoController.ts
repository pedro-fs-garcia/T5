import { Request, Response } from 'express';

export class ClienteServicoController {
  async create(req: Request, res: Response) {
    // Lógica para criar registro de serviço realizado para cliente
    res.status(201).json({ message: 'Serviço registrado' });
  }
  async getAll(req: Request, res: Response) {
    // Lógica para listar todos os serviços realizados
    res.json([]);
  }
  async getById(req: Request, res: Response) {
    // Lógica para buscar serviço realizado por id
    res.json({});
  }
  async update(req: Request, res: Response) {
    // Lógica para atualizar serviço realizado
    res.json({ message: 'Serviço atualizado' });
  }
  async delete(req: Request, res: Response) {
    // Lógica para deletar serviço realizado
    res.json({ message: 'Serviço deletado' });
  }
} 