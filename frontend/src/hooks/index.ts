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
    usePetsByCliente,
    useCreatePet,
    useUpdatePet,
    useDeletePet
} from './usePet';

// Serviço hooks
export {
    useServicos,
    useServico,
    useCreateServico,
    useUpdateServico,
    useDeleteServico
} from './useServico';

// Produto hooks
export {
    useProdutos,
    useProduto,
    useCreateProduto,
    useUpdateProduto,
    useUpdateEstoque,
    useDeleteProduto
} from './useProduto'; 