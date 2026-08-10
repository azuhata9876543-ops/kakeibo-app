package com.backend.backend.repository;

import com.backend.backend.entity.EntityCategory;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CategoryRepository extends JpaRepository<EntityCategory, Long> {
    
}
