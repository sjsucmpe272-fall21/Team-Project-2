package com.sjsu.reskilltheworkforce.dao;


import com.sjsu.reskilltheworkforce.model.JobPostings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface IndeedJobsRepository extends JpaRepository<JobPostings,Integer> {

    @Query(value = "SELECT * FROM jobpostings WHERE location = :location AND role =:role", nativeQuery = true)
    ArrayList<JobPostings> getJobPostings(@Param("location") String location,@Param("role") String role);

}
