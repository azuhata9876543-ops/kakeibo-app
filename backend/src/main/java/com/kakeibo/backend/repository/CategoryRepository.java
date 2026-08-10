package com.kakeibo.backend.repository;

import com.kakeibo.backend.entity.EntityCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<EntityCategory, Long> {
    
}
