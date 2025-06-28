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
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
      
      const data: ApiResponse<T> = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro desconhecido no servidor');
      }
      
      return data.data!;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout: A requisição demorou muito para responder');
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão: Verifique se o servidor está rodando');
      }
      throw error;
    }
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