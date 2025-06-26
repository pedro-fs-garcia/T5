// Base hook
export { useApi } from './useApi';

// Cliente hooks
export {
    useClientes,
    useCliente,
    useCreateCliente,
    useUpdateCliente,
    useDeleteCliente
} from './useCliente';

// Pet hooks
export {
    usePets,
    usePet,
    usePetById,
    usePetsByCliente,
    useCreatePet,
    useUpdatePet,
    useDeletePet
} from './usePet';

// Serviço hooks
export {
    useServicos,
    useServico,
    useServicoById,
    useCreateServico,
    useUpdateServico,
    useDeleteServico
} from './useServico';

// Produto hooks
export {
    useProdutos,
    useProduto,
    useProdutoById,
    useCreateProduto,
    useUpdateProduto,
    useUpdateEstoque,
    useDeleteProduto
} from './useProduto';

// ClienteServico hooks
export {
    useClienteServicos,
    useClienteServico,
    useClienteServicoById,
    useClienteServicosByCliente,
    useCreateClienteServico,
    useUpdateClienteServico,
    useDeleteClienteServico
} from './useClienteServico';

// ClienteProduto hooks
export {
    useClienteProdutos,
    useClienteProduto,
    useClienteProdutoById,
    useClienteProdutosByCliente,
    useCreateClienteProduto,
    useUpdateClienteProduto,
    useDeleteClienteProduto
} from './useClienteProduto'; 