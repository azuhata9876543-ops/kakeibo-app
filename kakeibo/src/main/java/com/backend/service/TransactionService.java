package com.backend.service;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import com.backend.entity.EntityTransaction;
import com.backend.repository.TransactionRepository;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<EntityTransaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Transactional
    public EntityTransaction createTransaction(EntityTransaction transaction) {
        EntityTransaction saved = transactionRepository.saveAndFlush(transaction);
        return transactionRepository.findById(saved.getId())
                .orElseThrow(() -> new RuntimeException("登録データの取得に失敗しました。"));
    }

    @Transactional
    public EntityTransaction updateTransaction(Long id, EntityTransaction newtransaction) {
        return transactionRepository.findById(id)
                .map(item -> {
                    item.setAmount(newtransaction.getAmount());
                    
                    item.setDate(newtransaction.getDate());
                    item.setMemo(newtransaction.getMemo());
                    var newCategory = newtransaction.getCategory();
                    if (newCategory != null) {
                        newCategory.setSubCategory(newCategory.getSubCategory());
                    }
                    item.setCategory(newCategory);
                    return transactionRepository.saveAndFlush(item);
                })
                .orElseThrow(() -> new RuntimeException("指定された取引(ID: " + id + ")は見つかりませんでした。"));
    }


    @Transactional
    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("削除対象の取引(ID: " + id + ")は見つかりませんでした。");
        }
        transactionRepository.deleteById(id);
    }
}
