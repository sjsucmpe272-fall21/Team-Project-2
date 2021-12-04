package com.sjsu.reskilltheworkforce.dao;

import com.sjsu.reskilltheworkforce.model.BatchTracker;
import com.sjsu.reskilltheworkforce.model.JobPostings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface BatchTrackerRepository extends JpaRepository<BatchTracker, String> {

    @Query(value = "SELECT * FROM batchtracker WHERE id = :id", nativeQuery = true)
    public BatchTracker getJobStatus(@Param("id") String id);


}
