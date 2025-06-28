interface EstatisticasConsumo {
  cliente: {
    id: number;
    nome: string;
  };
  quantidade: number;
  valor: number;
}

interface EstatisticasItem {
  item: {
    id: number;
    nome: string;
    tipo: 'produto' | 'servico';
  };
  quantidade: number;
}

interface EstatisticasPet {
  tipo: string;
  raca: string;
  itens: EstatisticasItem[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ServicoEstatisticas {
  private baseURL = 'http://localhost:3001/api';

  private async fazerRequisicao<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data: ApiResponse<T> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Erro desconhecido');
    }
    
    return data.data!;
  }

  // Obter top 10 clientes por quantidade de consumo
  async obterTopClientesPorQuantidade(): Promise<EstatisticasConsumo[]> {
    return this.fazerRequisicao<EstatisticasConsumo[]>('/estatisticas/top-clientes-quantidade');
  }

  // Obter itens mais consumidos
  async obterItensMaisConsumidos(): Promise<EstatisticasItem[]> {
    return this.fazerRequisicao<EstatisticasItem[]>('/estatisticas/itens-mais-consumidos');
  }

  // Obter consumo por tipo e raça de pet
  async obterConsumoPorTipoRaca(): Promise<EstatisticasPet[]> {
    return this.fazerRequisicao<EstatisticasPet[]>('/estatisticas/consumo-por-tipo-raca');
  }

  // Obter top 5 clientes por valor
  async obterTopClientesPorValor(): Promise<EstatisticasConsumo[]> {
    return this.fazerRequisicao<EstatisticasConsumo[]>('/estatisticas/top-clientes-valor');
  }
} 