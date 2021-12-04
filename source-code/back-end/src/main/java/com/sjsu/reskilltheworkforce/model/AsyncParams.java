package com.sjsu.reskilltheworkforce.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AsyncParams {
    TokenResponse token;
    BatchTracker tracker;

}
