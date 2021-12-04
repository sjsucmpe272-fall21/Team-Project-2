package com.sjsu.reskilltheworkforce.util;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class KeywordConstants {
    public static final List<String> program_languages = Arrays.asList("bash", "r", "python", "java", "c++", "ruby", "perl", "matlab", "javascript", "scala", "php", "c", "c#");
    public static final List<String> analysis_software = Arrays.asList("excel", "tableau", "sas", "spss", "d3", "saas", "pandas", "numpy", "scipy", "sps", "spotfire", "scikit", "splunk", "power", "h2o");
    public static final List<String> ml_framework = Arrays.asList("pytorch", "tensorflow", "caffe", "caffe2", "cntk", "mxnet", "paddle", "keras", "bigdl");
    public static final List<String> bigdata_tool = Arrays.asList("hadoop", "mapreduce", "spark", "pig", "hive", "shark", "oozie", "zookeeper", "flume", "mahout", "etl");
    public static final List<String> ml_platform = Arrays.asList("aws", "azure", "gcm", "ibm");
    public static final List<String> methodology = Arrays.asList("agile", "devops", "scrum");
    public static final List<String> databases = Arrays.asList("sql", "nosql", "hbase", "cassandra", "mongodb", "mysql", "mssql", "postgresql", "oracle", "rdbms", "bigquery");
    public static final List<String> web_framework = Arrays.asList("spring", "react", "reactjs", "angular", "springboot", "flask", "django", "nodejs", "expressjs", "node", "express");
    public static final Set<String> generic = new HashSet<>(Arrays.asList("cassandra",
            "hadoop",
            "maven",
            "pig",
            "solr",
            "tomcat",
            "jira",
            "backbone.js",
            "drupal",
            "dhtml",
            "xhtml",
            "xml",
            "lamp",
            "linux",
            "ec2",
            "s3",
            "groovy",
            "ant",
            "hive",
            "kafka",
            "spark",
            "struts",
            "svn",
            "subversion",
            "bash",
            "css",
            "css3",
            "html",
            "html5",
            "django",
            "docker",
            "kubernetes",
            "qtest",
            "gradle",
            "react",
            "angular",
            "reactjs",
            "elasticsearch",
            "git",
            "angularjs",
            "hibernate",
            "spring",
            "springboot",
            "spring",
            "springcloud",
            "springbatch",
            "orm",
            "json",
            "jquery",
            "j2ee",
            ".net",
            "jsp",
            "jdbc",
            "salesforce",
            "ubuntu",
            "autocad",
            "intellij",
            "php",
            "jupyter",
            "typescript",
            "kotlin",
            "dart",
            "ruby",
            "perl",
            "julia",
            "go",
            "pandas",
            "numpy",
            "tensorflow",
            "kera",
            "torchpy",
            "ansible",
            "chef",
            "puppet"
    ));
    public static final Set<String> another = new HashSet<>(Arrays.asList("junit","mockito","jenkins","ebs","saas","eclipse","intellij","ci/cd",".net","react.js","angular.js","splunk","hudson","bamboo","cvs","mercurial","jira","kibana",
            "knn","cnn","jboss","jetty","testng","selenium","hadoop","ejb","jsf","soap","rest","java8","containers","container","couchbase","oops","blockchain","openai","prophet",
            "bootstrap","mocha","jasmine","mern","mean","jmockit","emma","nunit","jtest","parasoft","karma","typemock","cantata","htmlunit","embunti","terraform"));
    public static final List<String> overall_skills_dict = Stream.of(program_languages, analysis_software, ml_framework, bigdata_tool, ml_platform, methodology, databases, web_framework,another,generic)
            .flatMap(Collection::stream)
            .collect(Collectors.toList());
    //public static final List<String> education = Arrays.asList("master","phd","undergraduate","bachelor","mba");
    public static final Set<String> overall_dict = new HashSet<>(Stream.of(overall_skills_dict).flatMap(Collection::stream)
            .collect(Collectors.toList()));

    public static final Set<String> stopwords = new HashSet<>(Arrays.asList("i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "you're", "you've", "you'll", "you'd", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "she's", "her", "hers", "herself", "it", "it's", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "that'll", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "don't", "should", "should've", "now", "d", "ll", "m", "o", "re", "ve", "y", "ain", "aren", "aren't", "couldn", "couldn't", "didn", "didn't", "doesn", "doesn't", "hadn", "hadn't", "hasn", "hasn't", "haven", "haven't", "isn", "isn't", "ma", "mightn", "mightn't", "mustn", "mustn't", "needn", "needn't", "shan", "shan't", "shouldn", "shouldn't", "wasn", "wasn't", "weren", "weren't", "won", "won't", "wouldn", "wouldn't"));

}
