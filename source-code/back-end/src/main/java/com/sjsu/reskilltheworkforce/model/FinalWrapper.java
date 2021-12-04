package com.sjsu.reskilltheworkforce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FinalWrapper {
    String userskills;
    List<JobPostings> jobPostingsList;
}
