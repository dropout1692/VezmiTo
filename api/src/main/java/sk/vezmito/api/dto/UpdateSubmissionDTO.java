package sk.vezmito.api.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.enums.SubmissionType;

@Getter
@Setter
@AllArgsConstructor
public class UpdateSubmissionDTO {

    private String title;
    private SubmissionType submissionType;
    private List<Tag> tags;

    private String name;
    private String gpsLatitude;
    private String gpsLongitude;
    private String description;
}
