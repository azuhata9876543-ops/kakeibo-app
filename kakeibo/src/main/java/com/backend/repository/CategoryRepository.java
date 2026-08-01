package com.backend.repository;

import com.backend.entity.EntityCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<EntityCategory, Long> {
    
}
