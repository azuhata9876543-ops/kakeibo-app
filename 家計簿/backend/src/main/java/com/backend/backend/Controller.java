package com.backend.backend;

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


@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    @Autowired
    private Repository repository;

    @GetMapping
    public List<EntityTransaction>getAll() {
        return repository.findAll();
    }

    @PostMapping
    public EntityTransaction create(@RequestBody EntityTransaction transaction) {
        return repository.save(transaction);
    }

    @PutMapping("/{id}")
    public EntityTransaction update(@PathVariable Long id, @RequestBody EntityTransaction updateItem) {
        return repository.findById(id)
            .map(item -> {
                item.setDate(updateItem.getDate());
                item.setAmount(updateItem.getAmount());
                item.setMemo(updateItem.getMemo());
                item.setCategoryType(updateItem.getCategoryType());
                item.setCategory(updateItem.getCategory());
                item.setSubcategory(updateItem.getSubcategory());
                return repository.save(item);
            })
            .orElseThrow(() -> new RuntimeException("見つかりませんでした"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
