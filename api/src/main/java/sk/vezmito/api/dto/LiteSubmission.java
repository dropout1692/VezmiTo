package sk.vezmito.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.enums.SubmissionType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LiteSubmission {

    private String id;
    private Location location;
    private SubmissionType submissionType;
}
