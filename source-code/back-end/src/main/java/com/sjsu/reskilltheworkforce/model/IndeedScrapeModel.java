package com.sjsu.reskilltheworkforce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class IndeedScrapeModel {

    private String location;
    private String jobPostingUrl;

}
