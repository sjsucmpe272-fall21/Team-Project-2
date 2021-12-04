package com.sjsu.reskilltheworkforce.service;

import com.sjsu.reskilltheworkforce.dao.BatchTrackerRepository;
import com.sjsu.reskilltheworkforce.dao.IndeedJobsRepository;
import com.sjsu.reskilltheworkforce.model.*;
import com.sjsu.reskilltheworkforce.util.IndeedScraper;
import com.sjsu.reskilltheworkforce.util.KeywordMatcher;
import com.sjsu.reskilltheworkforce.util.PDFUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
public class JobService {

    @Autowired
    KeywordMatcher keywordMatcher;

    @Autowired
    IndeedJobsRepository jobRepository;

    @Autowired
    BatchTrackerRepository batchTrackerRepository;

    @Autowired
    PDFUtil pdfUtil;

    @Autowired
    IndeedScraper indeedScraper;

    public Object getResumeKeyword(String obj) {
        String kk = keywordMatcher.extractKeywords(obj);
        log.info("keywords:{}", kk);
        return kk;
    }

    public Object getJobs(JobParams jobParams) {
        log.info("Entering getJobs");
        String resumeKeywords = null;
        List<JobPostings> jobPostingsList = null;
        FinalWrapper finalWrapper = null;
        try {
            String pdfText = pdfUtil.getPDFTextAWS(jobParams.getFilename());
            resumeKeywords = keywordMatcher.extractKeywords(pdfText);
            jobPostingsList = jobRepository.getJobPostings(jobParams.getLocation(), jobParams.getRoles());
            if (jobPostingsList != null && jobPostingsList.size() > 0) {
                log.info("list size is {}", jobPostingsList.size());
                keywordMatcher.calCulateCosine(jobPostingsList,resumeKeywords);

                finalWrapper = new FinalWrapper(resumeKeywords,jobPostingsList.subList(0,jobPostingsList.size()>9?10:jobPostingsList.size()));
            } else {

                String token = UUID.randomUUID().toString();
                BatchTracker batchTracker = new BatchTracker(token, resumeKeywords, "STARTED", jobParams.getLocation(),jobParams.getRoles());
                batchTrackerRepository.save(batchTracker);
                log.info("in jobservice: ip is{}", jobParams);
                return new AsyncParams(new TokenResponse(token),batchTracker);
            }
        } catch (Exception e) {
           // log.error("Exception occured:{}",e);
            throw e;
        } finally {
            log.info("Exiting getJobs");
        }
        return  finalWrapper;
    }
    /*@Async
    public void triggerJob(JobParameters jobParameters ){
        try {
            //jobLauncher.run(job, jobParameters);
        } catch (JobExecutionAlreadyRunningException e) {
            e.printStackTrace();
        } catch (JobRestartException e) {
            e.printStackTrace();
        } catch (JobInstanceAlreadyCompleteException e) {
            e.printStackTrace();
        } catch (JobParametersInvalidException e) {
            e.printStackTrace();
        }
    }*/
    public Object getJobsByToken(String token) {
        log.info("Entering getJobsByToken");
        String resumeKeywords = null;
        FinalWrapper finalWrapper = null;
        List<JobPostings> jobPostingsList = null;
        BatchTracker tracker = null;
        Object object = null;
        try {

            tracker = batchTrackerRepository.getJobStatus(token);
            if(tracker==null){
                return new JobStatus(token,"TOKEN IS INVALID");
            }
            object = new JobStatus(tracker.getId(),tracker.getStatus());
            if(tracker.getStatus().equals("COMPLETED")){
                //TODO STATUS
                resumeKeywords = tracker.getKeywords();
                jobPostingsList = jobRepository.getJobPostings(tracker.getLocation(), tracker.getRole());
                if (jobPostingsList != null && jobPostingsList.size() > 0) {
                    log.info("list size is {}", jobPostingsList.size());
                    keywordMatcher.calCulateCosine(jobPostingsList,resumeKeywords);

                    finalWrapper = new FinalWrapper(tracker.getKeywords(),jobPostingsList.subList(0,jobPostingsList.size()>9?10:jobPostingsList.size()));
                object = finalWrapper;
                }
            }

        } catch (Exception e) {
           // log.error("Exception occured in getJobsByToken:{}",e);
            throw e;
        } finally {
            log.info("Exiting getJobsByToken");
        }
        return  object;
    }
    public void s3(){
        try {
            /*URL url = new URL("https://reskill-bucket.s3.us-east-2.amazonaws.com/Devansh Alok+Resume.pdf");
            InputStream is = url.openStream();
            PDDocument doc2 = PDDocument.load(is);
            String text2 = new PDFTextStripper().getText(doc2);
            log.info("Text2 is:{}",text2);*/

        }catch (Exception e){
            log.error("{}",e);
        }
    }

    @Async("asyncExecutor")
    @Transactional
    public CompletableFuture doAsyncScrape(AsyncParams asyncParams){
        log.info("Entering doAsyncScrape is {}", asyncParams);

        BatchTracker tracker = null;
        try{

            tracker = asyncParams.getTracker();

            tracker.setStatus("INPROGRESS");
            batchTrackerRepository.saveAndFlush(tracker);

            List<JobPostings> list = indeedScraper.scrapeIndeed(new JobParams(tracker.getLocation(), tracker.getRole(), null));
            log.info("list size is {}", list.size());
            List<JobPostings> savelist = new ArrayList<>();
            for (JobPostings ij : list) {
                ij.setKeywords(keywordMatcher.extractKeywords(ij.getDesc()));
                ij.setDesc(null);
                ij.setLocation(tracker.getLocation());
                if (!ij.getKeywords().isEmpty()) {
                    savelist.add(ij);
                }
            }
            Iterable<JobPostings> op =jobRepository.saveAllAndFlush(savelist);
            log.info("op from save all jobs is:{}",op);
            tracker.setStatus("COMPLETED");
            batchTrackerRepository.saveAndFlush(tracker);

        }catch (Exception e){
            tracker.setStatus("FAILED");
            batchTrackerRepository.saveAndFlush(tracker);
            // log.error("Exception occured:{}",e);
            throw e;
        }finally {
            log.info("Exiting doAsyncScrape");
        }
        return null;
    }

}
