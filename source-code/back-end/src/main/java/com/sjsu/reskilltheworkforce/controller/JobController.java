package com.sjsu.reskilltheworkforce.controller;


import com.sjsu.reskilltheworkforce.model.AsyncParams;
import com.sjsu.reskilltheworkforce.model.JobPostings;
import com.sjsu.reskilltheworkforce.model.JobParams;
import com.sjsu.reskilltheworkforce.model.TokenResponse;
import com.sjsu.reskilltheworkforce.service.JobService;
import info.debatty.java.stringsimilarity.Cosine;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/get-jobs-by-allparams")
    public ResponseEntity<?> getJobsByAllParams(@RequestBody JobParams jobParams) throws Exception {
        log.info("Entering getJobsByAllParams Api");
        Object resp = null;
        try {
            log.info("Input to API is:{}",jobParams);
            resp = jobService.getJobs(jobParams);
            if(resp!=null && resp.getClass().equals(AsyncParams.class)){
                jobService.doAsyncScrape((AsyncParams) resp);
                resp = ((AsyncParams) resp).getToken();
            }
        } catch (Exception e) {
            log.error("Error occured in getJobsByAllParams :{}", e);
            log.error("Error message is :{}",e.getMessage());
            log.error("Error message is :{}",e.getLocalizedMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        } finally {
            log.info("Exiting getJobsByAllParams Api");
        }
        return ResponseEntity.ok(resp);
    }


    @GetMapping("/get-jobs-by-token")
    public ResponseEntity<?> getJobsByToken(@RequestParam String token) throws Exception {
        log.info("Entering getJobsByToken Api");
        Object s = null;
        try {
            s = jobService.getJobsByToken(token);
        } catch (Exception e) {
            log.error("Error occured in getJobsByToken :{}", e);
            return ResponseEntity.status(400).body(e.getMessage());
        } finally {
            log.info("Exiting getJobsByToken Api");
        }
        return ResponseEntity.ok(s);
    }

    @PostMapping("/get-jobs-by-allparams3")
    public ResponseEntity<?> getJobsByAllParams3() throws Exception {
        log.info("Entering getJobsByAllParams Api3");
        List<JobPostings> s = null;
        try {
            jobService.s3();
        } catch (Exception e) {
            log.error("Error occured in getJobsByAllParams :{}", e);
            return ResponseEntity.status(400).body(e.getMessage());
        } finally {
            log.info("Exiting getJobsByAllParams Api");
        }
        return ResponseEntity.ok(s);
    }
}
