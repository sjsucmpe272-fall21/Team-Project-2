package com.sjsu.reskilltheworkforce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Comparator;
import java.util.Objects;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class IndeedScrapeModel  {

    private String location;
    private String jobPostingUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IndeedScrapeModel that = (IndeedScrapeModel) o;
        return jobPostingUrl.equals(that.jobPostingUrl);
    }

    @Override
    public int hashCode() {
        return jobPostingUrl.hashCode();
    }
}
