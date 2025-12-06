package com.imoveis.app.repository;

import com.imoveis.app.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Aqui você pode adicionar métodos customizados, por exemplo:
    // Optional<Cliente> findByEmail(String email);
    java.util.Optional<Cliente> findByLogin(String login);
    java.util.Optional<Cliente> findByEmail(String email);
}
