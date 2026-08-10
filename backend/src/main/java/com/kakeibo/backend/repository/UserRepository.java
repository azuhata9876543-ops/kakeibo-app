package com.kakeibo.backend.repository;

import com.kakeibo.backend.entity.EntityUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<EntityUser, String> {
    
}
