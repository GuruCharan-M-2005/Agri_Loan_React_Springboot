package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Entity
@Data
public class FileDataModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fileId;

    private String name;
    private long size;
    private String type;
    private String webkitRelativePath;
    private long lastModified;
   
}
