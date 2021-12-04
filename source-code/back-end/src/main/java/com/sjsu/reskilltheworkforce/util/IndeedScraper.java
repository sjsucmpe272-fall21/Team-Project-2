package com.sjsu.reskilltheworkforce.util;

import com.sjsu.reskilltheworkforce.model.JobPostings;
import com.sjsu.reskilltheworkforce.model.IndeedScrapeModel;
import com.sjsu.reskilltheworkforce.model.JobParams;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class IndeedScraper {

    private ChromeOptions options = null;
    private ChromeDriver driver = null;
    private String chromeDriverPath = null;
    public static  Integer MAX_RESULT_PER_CITY = 50;
    public static  Integer PAGE_RECORD_LIMIT = 10;
    public static  Integer NUM_PAGES = MAX_RESULT_PER_CITY/PAGE_RECORD_LIMIT;

    public IndeedScraper(@Value("${maxlimit}") Integer maxlimt,
                         @Value("${perpagelimit}") Integer perpagelimt) {
        this.chromeDriverPath = chromeDriverPath;
        options = new ChromeOptions();

       options.addArguments("headless");
        options.addArguments("--disable-infobars");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--no-sandbox");
        options.addArguments("--remote-debugging-port=9222");
        options.setCapability(CapabilityType.UNEXPECTED_ALERT_BEHAVIOUR, UnexpectedAlertBehaviour.ACCEPT);
        //recently added
        options.setPageLoadStrategy(PageLoadStrategy.NONE);

//        System.setProperty("webdriver.chrome.driver",chromeDriverPath);
        log.info("options are:{}",options);
        log.info("sytem:{}",System.getProperty("webdriver.chrome.driver"));
        //driver = new ChromeDriver(options);
        this.MAX_RESULT_PER_CITY = maxlimt;
        this.PAGE_RECORD_LIMIT= perpagelimt;
        this.NUM_PAGES = MAX_RESULT_PER_CITY/PAGE_RECORD_LIMIT;
        log.info("max results per city:{},PAGE RECORD LIMIT:{},NUM_PAGES:{}",MAX_RESULT_PER_CITY,PAGE_RECORD_LIMIT,NUM_PAGES);

    }
    public void initializeChrome(){
        try {
            driver = new ChromeDriver(options);
        }catch (SessionNotCreatedException e){
            log.error("excpetion during initializing chrome:{}",e);
            options.addArguments("--remote-debugging-port=9230");
            driver = new ChromeDriver();
        }
    }

    public List<JobPostings> scrapeIndeed(JobParams jobParams) {
        log.info("Entering scrapeIndeed");
        List<IndeedScrapeModel> indeedScrapeModelList = new ArrayList<>();
        List<JobPostings> indeedJobScrapeModels = new ArrayList<>();
        try {
            //log.info("hello");
            initializeChrome();
            //log.info("hi:{}",driver);
            driver.manage().timeouts().pageLoadTimeout(IndeedConstants.pageLoadTimeout, TimeUnit.SECONDS);
            Thread.sleep(1000);
            for (int i = 0; i < NUM_PAGES; i++) {
                log.info("page number is :{}",i);
                String url = buildIndeedURL(jobParams,(i*PAGE_RECORD_LIMIT)+1);
                log.info("indeed url :{}",url);

                driver.get(url);
                Thread.sleep(2000);
                try {
                    List<WebElement> webElements = driver.findElements(By.xpath("//*[contains(@id,'job_')]"));

                    log.info("webelement size is {}",webElements);
//                    log.info("webelement:{}",webElements);
                    webElements = driver.findElementsByXPath("//*[contains(@id,'job_')]");

                   /* log.info("weelemtn size is {}",webElements);
                    log.info("webelement:{}",webElements);
                    log.info("weelemtn size is {}",webElements);
                    log.info("webelement:{}",webElements);
                   */ for (WebElement element : webElements) {
                        String jobLink = element.getAttribute("href");
                        //log.info("job_link is {}", jobLink);
                        IndeedScrapeModel ism = new IndeedScrapeModel(jobParams.getLocation(), jobLink);

                        indeedScrapeModelList.add(ism);
                    }

                } catch (NoSuchElementException e) {
                    log.error("NoSuchElementException exception :{}", e);
                    log.error("finished");
                    continue;
                }
                Thread.sleep(3000);
               // log.info("File:{}",indeedScrapeModelList);
            }
            log.info("SEnding these :{} many links to scrape individually",indeedScrapeModelList.size());
            indeedJobScrapeModels = scrapeIndeedEachLink(indeedScrapeModelList,jobParams);
        } catch (RuntimeException e) {
            log.error("Exception occured while scraping Indeed:{}", e);
        } catch (Exception e) {
            log.error("Exception occured while scraping Indeed:{}", e);
            driver.quit();
        } finally {
            log.info("driver is {}",driver);
            log.info("Exiting scrapeIndeed");
        }
        return indeedJobScrapeModels;
    }

    public List<JobPostings> scrapeIndeedEachLink(List<IndeedScrapeModel> indeedScrapeModelList, JobParams jobParams) {
        log.info("Entering scrapeIndeed");
        List<JobPostings> indeedJobScrapeModelList = new ArrayList<>();
        try {
//            log.info("hello");

//            log.info("hi:{}",driver);
            driver.manage().timeouts().pageLoadTimeout(IndeedConstants.pageLoadTimeout, TimeUnit.SECONDS);
            Thread.sleep(1000);
            for (IndeedScrapeModel job:indeedScrapeModelList) {
                //String url = buildIndeedURL(jobParams,i*IndeedConstants.PAGE_RECORD_LIMIT);
                //log.info("hi url :{}",url);

                driver.get(job.getJobPostingUrl());
                Random rand = new Random();
                int randomNum = 2 + rand.nextInt((5 - 2) + 2);
               // log.info("sleeping for:{}",randomNum);
                Thread.sleep(randomNum*1000);

                log.info("url is:{}",job.getJobPostingUrl());
                try {
                    if (!driver.getCurrentUrl().contains("indeed")){
                        continue;
                    }
                   String title = driver.findElementByXPath("//*[@class='icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title']").getText();
                    log.info("title is {}",title);
                    String company = driver.findElementByXPath("//*[@class='icl-u-lg-mr--sm icl-u-xs-mr--xs']").getText();
                    log.info("company is:{} ",company);
                    String salary = "";
                    try{
                        WebElement element = driver.findElementByXPath("//*[@class='jobsearch-JobMetadataHeader-item ']");

                        if(element != null) {
                            salary = element.getText();
                        }
                     //   log.info("salary :{}",salary);
                    }catch (NoSuchElementException ec){

                    }
                    String desc =driver.findElementByXPath("//*[@class=\"jobsearch-JobComponent-description icl-u-xs-mt--md\"]").getText();
                    //log.info("desc :{}",desc);
                    String curl = "";
                    try{
                        WebElement we  =driver.findElementByXPath("//*[@class=\"icl-Button icl-Button--primary icl-Button--lg icl-Button--block jobsearch-CallToApply-applyButton-newDesign\"]");

                        if(we != null) {
                            curl = we.getAttribute("href");
                        }
                    }catch (NoSuchElementException ec){
                       // log.error("exception:{}",ec);
                        try {
                            WebElement we = driver.findElementByXPath("//*[@class=\"icl-Button icl-Button--primary icl-Button--md icl-Button--block jobsearch-CallToApply-applyButton-newDesign\"]");
                            if (we != null) {
                                curl = we.getAttribute("href");
                            }
                        }catch (NoSuchElementException e){
                           // log.error("exception:{}",ec);
                        }
                    }
                    if(curl.isEmpty()){
                        curl = job.getJobPostingUrl();
                    }
                    log.info("curl :{}",curl);

                    JobPostings m = new JobPostings(null,desc,company,curl,salary, jobParams.getRoles(),title,null,job.getLocation(),null);
                    indeedJobScrapeModelList.add(m);

                } catch (NoSuchElementException e) {
                    log.error("NoSuchElementException exception :{}", e);
                    log.error("finished");
                   // break;
                    continue;
                }
                Thread.sleep(3000);
                //log.info("File:{}",indeedScrapeModelList);
            }
        } catch (RuntimeException e) {
            log.error("Exception occured while scraping Indeed:{}", e);
        } catch (Exception e) {
            log.error("Exception occured while scraping Indeed:{}", e);
        } finally {
           // log.info("driver is {}",driver);
            try{

            driver.quit();}
            catch (Exception e){
                log.error("exception :{}",e);
            }
            log.info("Exiting scrapeIndeed");
        }
        log.info("SEnding back  :{} many links after scraping",indeedJobScrapeModelList.size());

        return indeedJobScrapeModelList;
    }


    public String buildIndeedURL(JobParams jobParams,int start) {
        String s = new StringBuilder(IndeedConstants.BASEURL).append(jobParams.getRoles()).append(IndeedConstants.AND).append(IndeedConstants.LOCATION)
                .append(jobParams.getLocation()).append(IndeedConstants.AND).append(IndeedConstants.LIMIT).append(PAGE_RECORD_LIMIT).append(IndeedConstants.AND)
                .append(IndeedConstants.FROM_AGE).append(IndeedConstants.DAYRANGE).append("&start=").append(start).toString();
        URL url = null;
        try {
            url = new URL(s);
            URI uri = new URI(url.getProtocol(), url.getUserInfo(), url.getHost(), url.getPort(), url.getPath(), url.getQuery(), url.getRef());
            System.out.println("uri is "+uri.toString());
            s = uri.toString();
        } catch (MalformedURLException | URISyntaxException e) {
            e.printStackTrace();
        }
        return s;
    }
}
