package com.sjsu.reskilltheworkforce.util;

import com.sjsu.reskilltheworkforce.model.JobPostings;
import info.debatty.java.stringsimilarity.Cosine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class KeywordMatcher {



    public String extractKeywords(String text){
        String keywordsStr = null;
        log.info("text input is :{}",text);
        text = text.replaceAll("[^a-zA-Z+3#]"," ");

        log.info("text after regex is :{}",text);
        List<String> splitText = new ArrayList<>();
        splitText = Arrays.asList(text.toLowerCase().split(" "));
        log.info("text after lower split is :{}",text);
        TreeSet<String> keywords = new TreeSet<>();
       log.info("split text is :{}",splitText);
        keywords = new TreeSet<>(splitText.parallelStream().filter(t->!KeywordConstants.stopwords.contains(t) && KeywordConstants.overall_dict.contains(t)).collect(Collectors.toSet()));
        log.info("text after keywords is :{}",keywords);
        keywordsStr = String.join(" ", keywords);
        log.info("text after keywordsStr is :{}",keywordsStr);
        return  keywordsStr;
    }

    public void extractKeywordsAndCosine(List<JobPostings> jobPostingsList,String resumeKeywords){
        for(JobPostings jobPostings:jobPostingsList) {
            String keywords = extractKeywords(jobPostings.getDesc());
            jobPostings.setKeywords(keywords);
            calCulateCosine(jobPostings, resumeKeywords);
            jobPostings.setDesc(null);
        }
    }


    public void calCulateCosine(JobPostings jobPosting,String resumeKeywords){
        Cosine c = new Cosine();
        List<String> jjj = new ArrayList<>();
        BigDecimal ten = new BigDecimal(10);
            ;
            // Set<String> aa1=aaa.getKeywords();
            //   aa1.sort(String.CASE_INSENSITIVE_ORDER);
            String joined = String.join(" ", jobPosting.getKeywords());
            BigDecimal sim = BigDecimal.valueOf(c.similarity(joined,resumeKeywords));
            jobPosting.setSimscore(sim.multiply(ten));


    }
    public void calCulateCosine(List<JobPostings> jobPostingsList,String resumeKeywords){
        Cosine c = new Cosine();
        List<String> jjj = new ArrayList<>();
        BigDecimal ten = new BigDecimal(100);
        for(JobPostings jobPosting:jobPostingsList){

            String joined = String.join(" ", jobPosting.getKeywords());
            BigDecimal sim = BigDecimal.valueOf(c.similarity(joined,resumeKeywords));
            log.info("Sim is :{}",sim);
            log.info("simscore is :{}",sim.multiply(ten).toString());
            jobPosting.setSimscore(sim.multiply(ten));
        }
        jobPostingsList.sort((o1,o2)-> {
            return o2.getSimscore().compareTo(o1.getSimscore());

        });

    }

}
