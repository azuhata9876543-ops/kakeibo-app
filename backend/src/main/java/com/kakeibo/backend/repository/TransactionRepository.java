package com.kakeibo.backend.repository;

import com.kakeibo.backend.entity.EntityTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<EntityTransaction, Long> {
    
}
