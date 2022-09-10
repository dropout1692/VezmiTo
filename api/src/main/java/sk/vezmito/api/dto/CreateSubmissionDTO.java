package sk.vezmito.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.common.Author;
import sk.vezmito.api.enums.SubmissionType;

@Getter
@Setter
@AllArgsConstructor
public class CreateSubmissionDTO {

    private Author author;
    private SubmissionType submissionType;

    private String name;
    private String gpsX;
    private String gpsY;
    private String description;
}
