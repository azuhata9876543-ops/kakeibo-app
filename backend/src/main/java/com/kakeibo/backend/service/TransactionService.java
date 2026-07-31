package com.kakeibo.backend.service;

import com.kakeibo.backend.repository.TransactionRepository;
import com.kakeibo.backend.entity.EntityTransaction;
import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

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
        return transactionRepository.save(transaction);
    }

    @Transactional
    public EntityTransaction updateTransaction(Long id, EntityTransaction newtransaction) {
        return transactionRepository.findById(id)
                .map(item -> {
                    item.setAmount(newtransaction.getAmount());
                    item.setCategory(newtransaction.getCategory());
                    item.setDate(newtransaction.getDate());
                    item.setMemo(newtransaction.getMemo());
                    return transactionRepository.save(item);
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
