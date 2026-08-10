package com.backend.backend.controller;

import com.backend.backend.entity.EntityTransaction;
import com.backend.backend.repository.TransactionRepository;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionRepository repository;

    @GetMapping
    public List<EntityTransaction>getAll() {
        return repository.findAll();
    }

    @PostMapping
    public EntityTransaction create(@Valid @RequestBody EntityTransaction transaction) {
        return repository.save(transaction);
    }

    @PutMapping("/{id}")
    public EntityTransaction update(@PathVariable Long id,  @Valid @RequestBody EntityTransaction updateItem) {
        return repository.findById(id)
            .map(item -> {
                item.setDate(updateItem.getDate());
                item.setAmount(updateItem.getAmount());
                item.setMemo(updateItem.getMemo());
                item.setCategory(updateItem.getCategory());
                return repository.save(item);
            })
            .orElseThrow(() -> new RuntimeException("見つかりませんでした"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
