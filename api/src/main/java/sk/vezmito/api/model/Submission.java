package sk.vezmito.api.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;

@Data
@AllArgsConstructor
public class Submission {

    private String id;

    private Author author;

    private String title;
    private SubmissionState submissionState;
    private Location location;
    private String description;
    private SubmissionType submissionType;
    private List<String> tags;
    private List<Flag> flags;
    private List<String> photoUrls;

    private String pin;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    public Submission() {
        this.id = UUID.randomUUID().toString();
        this.submissionState = SubmissionState.CREATED;
    }
}
