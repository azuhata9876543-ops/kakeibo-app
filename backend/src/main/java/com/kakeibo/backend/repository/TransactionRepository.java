package com.kakeibo.backend.repository;

import com.kakeibo.backend.entity.EntityTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<EntityTransaction, Long> {
    
}
