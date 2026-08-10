package com.backend.backend.repository;

import com.backend.backend.entity.EntityTransaction;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TransactionRepository extends JpaRepository<EntityTransaction, Long>{
    
}
