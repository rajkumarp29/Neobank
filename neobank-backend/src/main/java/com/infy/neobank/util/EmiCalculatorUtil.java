package com.infy.neobank.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class EmiCalculatorUtil {

    public static double calculateEMI(double principal, double annualRate, int months) {

        double monthlyRate = annualRate / 12 / 100;

        double emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                     (Math.pow(1 + monthlyRate, months) - 1);

        // ✅ SRS REQUIRED: HALF_UP rounding
        return BigDecimal.valueOf(emi)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}