package sk.vezmito.api.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.enums.SubmissionType;

@Data
@AllArgsConstructor
public class CreateSubmissionDTO {

    private AuthorRequestDTO author;
    private String title;
    private SubmissionType submissionType;
    private List<String> tags;

    private List<String> photoUrls;

    private Location location;
    private String description;
}
