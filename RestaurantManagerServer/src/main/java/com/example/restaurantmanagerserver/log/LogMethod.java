package com.example.restaurantmanagerserver.log;

import com.example.restaurantmanagerserver.dto.LogDTO;
import com.opencsv.CSVWriter;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class LogMethod {
    public static void writeDataLineByLine(LogDTO logDTO) {
        String filePath = "src/main/java/com/example/restaurantmanagerserver/log/restaurant_log.csv";
        File file = new File(filePath);
        try {
            FileWriter outputfile = new FileWriter(file, true);
            CSVWriter writer = new CSVWriter(outputfile);
            String[] data = {logDTO.getTitle(), logDTO.getDetail(), logDTO.getTime()};
            writer.writeNext(data);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
