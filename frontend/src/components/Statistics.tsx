import React, { useEffect, useState } from 'react';
import { ServicoEstatisticas } from '../services/statisticsService';

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

const Estatisticas: React.FC = () => {
  const [topClientesPorQuantidade, setTopClientesPorQuantidade] = useState<EstatisticasConsumo[]>([]);
  const [itensMaisConsumidos, setItensMaisConsumidos] = useState<EstatisticasItem[]>([]);
  const [consumoPorTipoRaca, setConsumoPorTipoRaca] = useState<EstatisticasPet[]>([]);
  const [topClientesPorValor, setTopClientesPorValor] = useState<EstatisticasConsumo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const servicoEstatisticas = new ServicoEstatisticas();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);

        const [
          estatisticasQuantidade,
          itensConsumidos,
          estatisticasPet,
          estatisticasValor
        ] = await Promise.all([
          servicoEstatisticas.obterTopClientesPorQuantidade(),
          servicoEstatisticas.obterItensMaisConsumidos(),
          servicoEstatisticas.obterConsumoPorTipoRaca(),
          servicoEstatisticas.obterTopClientesPorValor()
        ]);

        setTopClientesPorQuantidade(estatisticasQuantidade);
        setItensMaisConsumidos(itensConsumidos);
        setConsumoPorTipoRaca(estatisticasPet);
        setTopClientesPorValor(estatisticasValor);
      } catch (err) {
        setErro('Erro ao carregar as estatísticas. Por favor, tente novamente.');
        console.error('Erro ao carregar estatísticas:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-muted" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3 text-muted fs-5">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="alert alert-danger border-0 shadow-sm" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {erro}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="mb-5">
            <h1 className="display-6 fw-light text-dark mb-2">
              Estatísticas do PetShop
            </h1>
            <p className="text-muted fs-5 mb-0">Análise de desempenho e insights de negócio</p>
            <hr className="border-2 border-primary" style={{ width: '80px' }} />
          </div>

          {/* Top 10 Clientes por Quantidade */}
          <section className="mb-5">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-people-fill text-primary fs-5"></i>
                  </div>
                  <div>
                    <h2 className="card-title h5 mb-1 text-dark">Top 10 Clientes por Quantidade</h2>
                    <p className="text-muted small mb-0">Clientes com maior número de compras</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {topClientesPorQuantidade.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 ps-4">
                            Posição
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3">
                            Cliente
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 text-end">
                            Quantidade
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 text-end pe-4">
                            Valor Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topClientesPorQuantidade.map((estatistica, index) => (
                          <tr key={index} className="border-bottom">
                            <td className="ps-4 py-3">
                              <span className="fw-medium text-muted">#{index + 1}</span>
                            </td>
                            <td className="py-3">
                              <a href={`/clientes/${estatistica.cliente.id}`} 
                                 className="text-decoration-none text-dark fw-medium">
                                {estatistica.cliente.nome}
                              </a>
                            </td>
                            <td className="text-end py-3">
                              <span className="fw-medium">{estatistica.quantidade}</span>
                            </td>
                            <td className="text-end py-3 pe-4">
                              <span className="fw-semibold text-success">
                                R$ {estatistica.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-3 mb-0">Nenhum dado disponível</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Itens Mais Consumidos */}
          <section className="mb-5">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-bag-fill text-success fs-5"></i>
                  </div>
                  <div>
                    <h2 className="card-title h5 mb-1 text-dark">Itens Mais Consumidos</h2>
                    <p className="text-muted small mb-0">Produtos e serviços com maior demanda</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {itensMaisConsumidos.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 ps-4">
                            Posição
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3">
                            Item
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 text-end pe-4">
                            Quantidade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {itensMaisConsumidos.map((estatistica, index) => (
                          <tr key={index} className="border-bottom">
                            <td className="ps-4 py-3">
                              <span className="fw-medium text-muted">#{index + 1}</span>
                            </td>
                            <td className="py-3">
                              <a href={`/${estatistica.item.tipo}s/${estatistica.item.id}`} 
                                 className="text-decoration-none text-dark fw-medium">
                                {estatistica.item.nome}
                              </a>
                            </td>
                            <td className="text-end py-3 pe-4">
                              <span className="fw-medium">{estatistica.quantidade}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-3 mb-0">Nenhum dado disponível</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Consumo por Tipo e Raça de Pet */}
          <section className="mb-5">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center">
                  <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-heart-fill text-info fs-5"></i>
                  </div>
                  <div>
                    <h2 className="card-title h5 mb-1 text-dark">Consumo por Tipo e Raça de Pet</h2>
                    <p className="text-muted small mb-0">Análise segmentada por características dos pets</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {consumoPorTipoRaca.length > 0 ? (
                  <div className="row g-4">
                    {consumoPorTipoRaca.map((estatistica, index) => (
                      <div key={index} className="col-12 col-lg-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-header bg-light border-0 py-3">
                            <h3 className="card-title h6 mb-0 text-dark fw-semibold">
                              <i className="bi bi-award-fill text-info me-2"></i>
                              {estatistica.tipo} - {estatistica.raca}
                            </h3>
                          </div>
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table table-sm mb-0 align-middle">
                                <thead className="bg-light">
                                  <tr>
                                    <th scope="col" className="border-0 text-muted fw-normal py-2 ps-3">
                                      Item
                                    </th>
                                    <th scope="col" className="border-0 text-muted fw-normal py-2 text-end pe-3">
                                      Qtd
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {estatistica.itens.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                      <td className="ps-3 py-2">
                                        <a href={`/${item.item.tipo}s/${item.item.id}`} 
                                           className="text-decoration-none text-dark">
                                          {item.item.nome}
                                        </a>
                                      </td>
                                      <td className="text-end pe-3 py-2">
                                        <span className="fw-medium">{item.quantidade}</span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-3 mb-0">Nenhum dado disponível</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Top 5 Clientes por Valor */}
          <section className="mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bi bi-gem text-warning fs-5"></i>
                  </div>
                  <div>
                    <h2 className="card-title h5 mb-1 text-dark">Top 5 Clientes por Valor</h2>
                    <p className="text-muted small mb-0">Clientes com maior valor em compras</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {topClientesPorValor.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 ps-4">
                            Posição
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3">
                            Cliente
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 text-end">
                            Valor Total
                          </th>
                          <th scope="col" className="border-0 text-muted fw-normal py-3 text-end pe-4">
                            Quantidade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topClientesPorValor.map((estatistica, index) => (
                          <tr key={index} className="border-bottom">
                            <td className="ps-4 py-3">
                              <span className="fw-medium text-muted">#{index + 1}</span>
                            </td>
                            <td className="py-3">
                              <a href={`/clientes/${estatistica.cliente.id}`} 
                                 className="text-decoration-none text-dark fw-medium">
                                {estatistica.cliente.nome}
                              </a>
                            </td>
                            <td className="text-end py-3">
                              <span className="fw-semibold text-success">
                                R$ {estatistica.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </td>
                            <td className="text-end py-3 pe-4">
                              <span className="fw-medium">{estatistica.quantidade}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-3 mb-0">Nenhum dado disponível</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Estatisticas;