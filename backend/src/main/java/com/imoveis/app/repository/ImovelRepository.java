package com.imoveis.app.repository;

import com.imoveis.app.model.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImovelRepository extends JpaRepository<Imovel, Long> {
    // Buscar imóveis por cliente
    List<Imovel> findByProprietarioId(Long clienteId);
    
    // Buscar imóveis por preço menor que determinado valor
    List<Imovel> findByPrecoLessThan(Double precoMaximo);
}