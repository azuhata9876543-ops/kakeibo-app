package com.backend.repository;

import com.backend.entity.EntityTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<EntityTransaction, Long> {
    // ユーザーIDに基づいてトランザクションを取得するメソッド
    List<EntityTransaction> findByUserId(String userId);
}
