package com.imoveis.app.service;

import com.imoveis.app.model.Cliente;
import com.imoveis.app.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Cria um novo cliente (sem arquivos/imagens).
     */
    public Cliente create(Cliente cliente) {
        // Criptografa a senha antes de salvar
        if (cliente.getSenha() != null && !cliente.getSenha().isBlank()) {
            cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        }

        Cliente saved = clienteRepository.save(cliente);
        // Não retorna a senha para o front-end
        saved.setSenha(null);
        return saved;
    }

    /**
     * Autenticação do cliente usando login ou email.
     */
    public Cliente authenticate(String loginOrEmail, String senha) {
        Optional<Cliente> maybe = clienteRepository.findByLogin(loginOrEmail);

        if (maybe.isEmpty()) {
            maybe = clienteRepository.findByEmail(loginOrEmail);
        }

        if (maybe.isPresent()) {
            Cliente c = maybe.get();
            if (c.getSenha() != null && passwordEncoder.matches(senha, c.getSenha())) {
                c.setSenha(null);
                return c;
            }
        }

        return null;
    }

    /**
     * Atualiza os dados de um cliente existente.
     */
    public Cliente update(Long id, Cliente details) {
        return clienteRepository.findById(id).map(cliente -> {

            cliente.setNome(details.getNome());
            cliente.setEmail(details.getEmail());
            cliente.setTelefone(details.getTelefone());
            cliente.setEndereco(details.getEndereco());
            cliente.setCpf(details.getCpf());
            cliente.setLogin(details.getLogin());

            // Atualiza senha apenas se fornecida
            if (details.getSenha() != null && !details.getSenha().isBlank()) {
                cliente.setSenha(passwordEncoder.encode(details.getSenha()));
            }

            cliente.setDataNascimento(details.getDataNascimento());
            return clienteRepository.save(cliente);

        }).orElse(null);
    }

    /**
     * Deleta um cliente pelo ID.
     */
    public void delete(Long id) {
        clienteRepository.findById(id).ifPresent(clienteRepository::delete);
    }

    /**
     * Retorna todos os clientes.
     */
    public Iterable<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    /**
     * Retorna um cliente pelo ID.
     */
    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }
}
