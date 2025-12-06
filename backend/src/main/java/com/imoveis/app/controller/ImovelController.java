package com.imoveis.app.controller;

import com.imoveis.app.model.Imovel;
import com.imoveis.app.repository.ImovelRepository;
import com.imoveis.app.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/imoveis")
@CrossOrigin(origins = "*") 

public class ImovelController {

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private ImovelService imovelService;

    // Listar todos os imóveis
    @GetMapping
    public List<Imovel> getAllImoveis() {
        return imovelRepository.findAll();
    }

    // Obter imóvel por ID
    @GetMapping("/{id}")
    public ResponseEntity<Imovel> getImovelById(@PathVariable Long id) {
        return imovelRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar imóvel (JSON only)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createImovel(@RequestBody Imovel imovel) {
        try {
            Imovel saved = imovelService.create(imovel);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao criar imóvel: " + e.getMessage());
        }
    }

    // Atualizar imóvel
    @PutMapping("/{id}")
    public ResponseEntity<Imovel> updateImovel(@PathVariable Long id, @RequestBody Imovel imovelDetails) {
        Imovel updated = imovelService.update(id, imovelDetails);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    // Deletar imóvel
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImovel(@PathVariable Long id) {
        if (!imovelRepository.existsById(id)) return ResponseEntity.notFound().build();
        imovelService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Listar imóveis por proprietário (cliente)
    @GetMapping("/proprietario/{clienteId}")
    public List<Imovel> getImoveisByCliente(@PathVariable Long clienteId) {
        return imovelRepository.findByProprietarioId(clienteId);
    }
}
