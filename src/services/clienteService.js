import api from "./api";
import { requestWrapper } from "./requestWrapper";
import ApiError from "./errors/ApiError";
import UnauthorizedError from "./errors/UnauthorizedError";
import UnexpectedError from "./errors/UnexpectedError";

class ClienteService {

  async listarClientes() {
    return requestWrapper(api.get("/clientes"));
  }

  async obterCliente(id) {
    return requestWrapper(api.get(`/clientes/${id}`));
  }

  async criarCliente(cliente) {
    if (typeof FormData !== 'undefined' && cliente instanceof FormData) {
      return requestWrapper(api.post('/clientes', cliente));
    }

    return requestWrapper(api.post("/clientes", cliente));
  }

  async atualizarCliente(id, cliente) {
    return requestWrapper(api.put(`/clientes/${id}`, cliente));
  }

  async deletarCliente(id) {
    return requestWrapper(api.delete(`/clientes/${id}`));
  }
}

export default new ClienteService();
