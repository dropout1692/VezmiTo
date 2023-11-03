package sk.vezmito.api.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.enums.SubmissionType;

@Data
@AllArgsConstructor
public class UpdateSubmissionDTO {

    private String title;
    private SubmissionType submissionType;
    private List<Tag> tags;

    private Location location;
    private String description;
}
