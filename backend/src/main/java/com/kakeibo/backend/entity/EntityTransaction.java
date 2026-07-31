package com.kakeibo.backend.entity;

import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class EntityTransaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "日付は必須です。")
    private LocalDate date;

    @NotNull(message = "金額は必須です。")
    @Min(value = 1, message = "金額は1以上を入力してください。")
    private Integer amount;

    @Size(max = 40, message = "メモは40文字以内で入力してください。")
    private String memo;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private EntityCategory category;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public EntityCategory getCategory() {
        return category;
    }

    public void setCategory(EntityCategory category) {
        this.category = category;
    }
}
