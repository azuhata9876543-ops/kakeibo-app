package com.backend.backend;

import java.time.LocalData;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "Transaction")
public class EntityTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "日付は必須入力です")
    private LocalDate date;

    @NotNull(message = "金額は必須入力です")
    @Min(value = 0, message = "金額は0円以上で入力してください")
    private Integer amount;

    @Max(value = 40, message = "入力は40字以内です")
    private String memo;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
