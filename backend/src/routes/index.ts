import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { PetController } from '../controllers/petController';
import { ServicoController } from '../controllers/servicoController';
import { ProdutoController } from '../controllers/produtoController';

const router = Router();
const clienteController = new ClienteController();
const petController = new PetController();
const servicoController = new ServicoController();
const produtoController = new ProdutoController();

// Cliente routes
router.post('/clientes', (req: Request, res: Response) => clienteController.create(req, res));
router.get('/clientes', (req: Request, res: Response) => clienteController.getAll(req, res));
router.get('/clientes/:id', (req: Request, res: Response) => clienteController.getById(req, res));
router.put('/clientes/:id', (req: Request, res: Response) => clienteController.update(req, res));
router.delete('/clientes/:id', (req: Request, res: Response) => clienteController.delete(req, res));

// Pet routes
router.post('/pets', (req: Request, res: Response) => petController.create(req, res));
router.get('/pets', (req: Request, res: Response) => petController.getAll(req, res));
router.get('/pets/:id', (req: Request, res: Response) => petController.getById(req, res));
router.get('/clientes/:clienteId/pets', (req: Request, res: Response) => petController.getByClienteId(req, res));
router.put('/pets/:id', (req: Request, res: Response) => petController.update(req, res));
router.delete('/pets/:id', (req: Request, res: Response) => petController.delete(req, res));

// Serviço routes
router.post('/servicos', (req: Request, res: Response) => servicoController.create(req, res));
router.get('/servicos', (req: Request, res: Response) => servicoController.getAll(req, res));
router.get('/servicos/:id', (req: Request, res: Response) => servicoController.getById(req, res));
router.put('/servicos/:id', (req: Request, res: Response) => servicoController.update(req, res));
router.delete('/servicos/:id', (req: Request, res: Response) => servicoController.delete(req, res));

// Produto routes
router.post('/produtos', (req: Request, res: Response) => produtoController.create(req, res));
router.get('/produtos', (req: Request, res: Response) => produtoController.getAll(req, res));
router.get('/produtos/:id', (req: Request, res: Response) => produtoController.getById(req, res));
router.put('/produtos/:id', (req: Request, res: Response) => produtoController.update(req, res));
router.delete('/produtos/:id', (req: Request, res: Response) => produtoController.delete(req, res));
router.patch('/produtos/:id/estoque', (req: Request, res: Response) => produtoController.updateEstoque(req, res));

export default router; 