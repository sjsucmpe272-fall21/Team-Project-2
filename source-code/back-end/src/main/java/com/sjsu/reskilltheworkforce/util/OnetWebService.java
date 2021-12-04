package com.sjsu.reskilltheworkforce.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Component
@Slf4j
public class OnetWebService {

    private RestTemplate restTemplate;

    @Value("${onet.username}")
    String username;
    @Value("${onet.password}")
    String password;
    int version = 1;
    String url_root = "https://services.onetcenter.org/ws/";

    public OnetWebService(RestTemplateBuilder restTemplateBuilder){
        this.restTemplate = restTemplateBuilder.build();
    }

    public Object getIndustryListing(){
        String url = url_root+"mnm/browse";
        return makeOnetRequest(url);
    }

    public Object getCareersByKeyword(String keyword){
        String url = url_root+"mnm/search?keyword="+keyword;
        return makeOnetRequest(url);
    }

    public Object getCareerByIndustry(String industryCode){
        String url = url_root+"mnm/browse/"+industryCode;
        return makeOnetRequest(url);
    }

    public Object makeOnetRequest(String url) {
        Object body = null;
        // create headers
        HttpHeaders headers = new HttpHeaders();
        // set `accept` header
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        log.error("username is :{},pass is {}",username,password);
        headers.setBasicAuth(username,password);
        // set custom header
        headers.set("x-request-source", "desktop");

        // build the request
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = this.restTemplate.exchange(url, HttpMethod.GET, request, String.class, 1);
        if(response.getStatusCode() == HttpStatus.OK) {
            String body1 = response.getBody();
            log.info("body is {}",body1);
            body = body1;
        }
        return body;
    }
}
