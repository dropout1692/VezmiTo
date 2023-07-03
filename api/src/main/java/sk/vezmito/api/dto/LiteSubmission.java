package sk.vezmito.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.enums.SubmissionType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LiteSubmission {

    private String id;
    private Location location;
    private SubmissionType submissionType;
}
