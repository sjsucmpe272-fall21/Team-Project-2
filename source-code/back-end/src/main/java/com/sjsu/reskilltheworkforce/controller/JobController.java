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
 }
        return ResponseEntity.ok(s);
    }
}
