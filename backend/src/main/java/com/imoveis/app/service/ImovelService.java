package com.imoveis.app.service;

import com.imoveis.app.model.Imovel;
import com.imoveis.app.repository.ImovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImovelService {

    @Autowired
    private ImovelRepository imovelRepository;

    // Criar imóvel
    public Imovel create(Imovel imovel) {
        validateImovel(imovel);
        return imovelRepository.save(imovel);
    }

    // Atualizar imóvel
    public Imovel update(Long id, Imovel details) {
        return imovelRepository.findById(id).map(imovel -> {
            imovel.setTitulo(details.getTitulo());
            imovel.setDescricao(details.getDescricao());
            imovel.setRua(details.getRua());
            imovel.setNumero(details.getNumero());
            imovel.setComplemento(details.getComplemento());
            imovel.setBairro(details.getBairro());
            imovel.setCidade(details.getCidade());
            imovel.setEstado(details.getEstado());
            imovel.setCep(details.getCep());
            imovel.setPreco(details.getPreco());
            imovel.setProprietario(details.getProprietario());
            return imovelRepository.save(imovel);
        }).orElseThrow(() -> new IllegalArgumentException("Imóvel não encontrado"));
    }

    // Deletar imóvel
    public void delete(Long id) {
        imovelRepository.findById(id).ifPresent(imovelRepository::delete);
    }

    // Validação simples antes de criar
    private void validateImovel(Imovel imovel) {
        if (imovel == null) throw new IllegalArgumentException("Imóvel não pode ser nulo");
        if (imovel.getTitulo() == null || imovel.getTitulo().isBlank())
            throw new IllegalArgumentException("Título do imóvel é obrigatório");
        if (imovel.getPreco() == null || imovel.getPreco() <= 0)
            throw new IllegalArgumentException("Preço do imóvel deve ser maior que zero");
        if (imovel.getProprietario() == null)
            throw new IllegalArgumentException("Proprietário do imóvel é obrigatório");
    }
}
