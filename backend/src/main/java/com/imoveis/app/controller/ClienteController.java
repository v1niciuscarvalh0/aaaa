package com.imoveis.app.controller;

import com.imoveis.app.model.Cliente;
import com.imoveis.app.repository.ClienteRepository;
import com.imoveis.app.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*") 

public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteService clienteService;

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    // Obter cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar / registrar cliente (apenas JSON)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createCliente(@RequestBody Cliente cliente) {
        try {
            Cliente saved = clienteService.create(cliente); // chama método sem arquivos
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao criar cliente: " + e.getMessage());
        }
    }

    // Autenticar cliente (login)
    @PostMapping("/login")
    public ResponseEntity<?> authenticateCliente(@RequestBody Cliente loginRequest) {
        if (loginRequest.getLogin() == null || loginRequest.getSenha() == null) {
            return ResponseEntity.badRequest().body("Login e senha são obrigatórios");
        }

        Cliente auth = clienteService.authenticate(loginRequest.getLogin(), loginRequest.getSenha());
        if (auth != null) return ResponseEntity.ok(auth);

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }

    // Atualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
        Cliente updated = clienteService.update(id, clienteDetails);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    // Deletar cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (!clienteRepository.existsById(id)) return ResponseEntity.notFound().build();
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
