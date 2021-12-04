package com.sjsu.reskilltheworkforce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;
import java.util.TreeSet;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "jobpostings")
public class JobPostings {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Integer id;
    @Transient
    @JsonIgnore
    private String desc;
    private String company;
    private String link;
    private String salary;
    private String role;
    private String title;
    private String keywords;
    private String location;
    @Transient
    private BigDecimal simscore;

}
