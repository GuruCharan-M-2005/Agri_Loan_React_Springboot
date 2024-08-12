package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.model.RepaymentModel;

import jakarta.transaction.Transactional;

public interface RepaymentRepo extends JpaRepository<RepaymentModel,Integer> {
     @Modifying
    @Transactional
    @Query("DELETE FROM RepaymentModel r WHERE r.dataModel.dataId = :loanId AND r.id = :repaymentId")
    void deleteByLoanIdAndRepaymentId(@Param("loanId") int loanId, @Param("repaymentId") int repaymentId);

}
