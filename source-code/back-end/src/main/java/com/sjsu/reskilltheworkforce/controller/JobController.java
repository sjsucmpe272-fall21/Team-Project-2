
package com.sjsu.reskilltheworkforce.controller;

import com.sjsu.reskilltheworkforce.service.OnetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@Slf4j
@RequestMapping("/api/reskill")
public class OnetController {

    @Autowired
    OnetService onetService;

    @GetMapping("/get-careers-by-keyword")
    public ResponseEntity<?> getCareerByKeyword(@RequestParam String keyword) throws Exception {
        log.info("Entering getCareerByKeyword Api");
        Object obj = null;
        try {
            obj = onetService.getCareersByKeyword(keyword);
        } catch (Exception e) {
            log.error("Error occured in getCareerByKeyword :{}", e);
            return ResponseEntity.status(400).body(e.getMessage());
        } finally {
            log.info("Exiting getCareerByKeyword Api");
        }
        return ResponseEntity.ok(obj);
    }

    @GetMapping("/get-industry-listing")
    public ResponseEntity<?> getIndustryListing() throws Exception {
        log.info("Entering getIndustryListing Api");
        Object obj = null;
        try {
            obj = onetService.getIndustryListing();
        } catch (Exception e) {
            log.error("Error occured in getIndustryListing :{}", e);
            return ResponseEntity.status(400).body(e.getMessage());
        } finally {
            log.info("Exiting getIndustryListing Api");
        }
        return ResponseEntity.ok(obj);
    }

    @GetMapping("/get-careers-by-industry")
    public ResponseEntity<?> getCareerInIndustry(@RequestParam String industrycode) throws Exception {
        log.info("Entering getCareerInIndustry Api");
        Object obj = null;
        try {
            obj = onetService.getCareerByIndustry(industrycode);
        } catch (Exception e) {
            log.error("Error occured in getCareerInIndustry :{}", e);
            return ResponseEntity.status(400).body(e.getMessage());
        } finally {
            log.info("Exiting getCareerInIndustry Api");
        }
        return ResponseEntity.ok(obj);
    }

}
