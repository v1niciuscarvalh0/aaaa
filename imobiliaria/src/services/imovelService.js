import api from "./api";
import { requestWrapper } from "./requestWrapper";

class ImovelService {
  // GET /imoveis
  async listarImoveis() {
    return requestWrapper(api.get("/imoveis"));
  }

  // GET /imoveis/{id}
  async obterImovel(id) {
    return requestWrapper(api.get(`/imoveis/${id}`));
  }

  // POST /imoveis
  async criarImovel(imovel) {
    if (typeof FormData !== 'undefined' && imovel instanceof FormData) {
      // let the browser set Content-Type (including boundary)
      return requestWrapper(api.post('/imoveis', imovel));
    }
    return requestWrapper(api.post("/imoveis", imovel));
  }

  // PUT /imoveis/{id}
  async atualizarImovel(id, imovel) {
    return requestWrapper(api.put(`/imoveis/${id}`, imovel));
  }

  // DELETE /imoveis/{id}
  async deletarImovel(id) {
    return requestWrapper(api.delete(`/imoveis/${id}`));
  }

  // GET /imoveis/proprietario/{clienteId}
  async listarPorCliente(clienteId) {
    return requestWrapper(api.get(`/imoveis/proprietario/${clienteId}`));
  }
}

export default new ImovelService();
