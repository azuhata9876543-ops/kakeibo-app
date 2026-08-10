package com.backend.backend.repository;

import com.backend.backend.entity.EntityUser;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<EntityUser, String> {
    
}
