package com.backend.backend;


import jakarta.persistence.*;

@Entity
@Table(name = "Transaction")
public class entityTransaction {
    @Id
    @GeneratedValue(strategy = GeneratedValue.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private String categoryType;
    private String category;
    private String suvCategory;
    private String memo;
    
}
