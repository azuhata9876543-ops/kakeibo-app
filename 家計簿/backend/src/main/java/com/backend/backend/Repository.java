package com.backend.backend;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface Repository extends JpaRepository<EntityTransaction, Long>{
    
}
