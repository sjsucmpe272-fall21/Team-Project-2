package com.sjsu.reskilltheworkforce.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "batchtracker")
public class BatchTracker {

    @Id
    private String id;
    private String keywords;
    private String status;
    private String location;
    private String role;
    /*@OneToMany(cascade=CascadeType.ALL)
    @JoinTable(name="batchjobmapping", joinColumns={@JoinColumn(name="batch_user_id", referencedColumnName="id")}
            , inverseJoinColumns={@JoinColumn(name="jobpostings_id", referencedColumnName="id")})
    private Set<JobPostings> accounts;*/
}
