package com.sjsu.reskilltheworkforce.service;

import com.sjsu.reskilltheworkforce.util.OnetWebService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OnetService {

    @Autowired
    OnetWebService onetWebService;

    public Object getCareersByKeyword(String keyword){
        return onetWebService.getCareersByKeyword(keyword);
    }
    public Object getIndustryListing(){
        return onetWebService.getIndustryListing();
    }

    public Object getCareerByIndustry(String industryCode){
        return onetWebService.getCareerByIndustry(industryCode);
    }
}
