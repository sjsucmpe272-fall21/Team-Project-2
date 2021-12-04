package com.sjsu.reskilltheworkforce.util;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Component
@Slf4j
public class PDFUtil {

    String accessKey;
    String secretKey;
    AmazonS3 s3client;
    String bucket;
    String directory;
    String region;

    @Autowired
    public PDFUtil(
            @Value("${aws.accesskey}")
                    String accessKey,
            @Value("${aws.secretkey}")
                    String secretKey,
            @Value("${aws.bucketname}")
                    String bucket, @Value("${aws.bucketname.directory}")
                    String directory,
            @Value("${aws.region}")
                    String region
    ) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.bucket = bucket;
        this.directory = directory;
        AWSCredentials creds = new BasicAWSCredentials(accessKey, secretKey);

        s3client = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(creds))
                .withRegion(region)
                .build();

    }

    public String getPDFText(MultipartFile multipartFile) {
        String pdfText = null;
        PDDocument doc = null;
        try {

            log.info("getPDFText is :{}");

            InputStream stream = multipartFile.getInputStream();

            doc = PDDocument.load(stream);
            pdfText = new PDFTextStripper().getText(doc);
            log.info("pdfText is:{}", pdfText);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (doc != null) {
                    doc.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return pdfText;
    }

    public String getPDFTextAWS(String username) throws Exception {
        String pdfText = null;
        PDDocument doc = null;
        try {
            log.info("username pdf input is :{}", username);

            ObjectListing objects = s3client.listObjects(bucket);
            //System.out.println(objects.getObjectSummaries());
            log.info("bucket is :{}", bucket);
            String filepath = directory + username + ".pdf";
            log.info("filepath is :{}", filepath);

            S3Object s3ob = s3client.getObject(bucket, filepath);
            S3ObjectInputStream s3is = s3ob.getObjectContent();
            InputStream stream = new InputStreamResource(s3is).getInputStream();

            doc = PDDocument.load(stream);
            pdfText = new PDFTextStripper().getText(doc);
            //log.info("pdfText is:{}", pdfText);
        } catch (AmazonS3Exception ex) {
            log.error("AmazonS3Exception occured while reading pdf:{}", ex);
            throw new Exception("The Specified file is not found in S3 Bucket");
        } catch (IOException e) {
            log.error("IOException occured while reading pdf:{}", e);
            throw new Exception("PDF can't be read, IO EXception");
        } catch (Exception e) {
            log.error("Exception occured while reading pdf:{}", e);
            throw new Exception(e.getMessage());
        } finally {
            try {
                if (doc != null) {
                    doc.close();
                }
            } catch (IOException e) {
                log.error("IOException occured while closing pdf:{}", e);
            }
        }
        return pdfText;
    }


}
