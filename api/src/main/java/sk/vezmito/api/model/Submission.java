package sk.vezmito.api.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.entities.SubmissionEntity;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;

@Getter
@Setter
@AllArgsConstructor
public class Submission {

    @Setter(AccessLevel.NONE)
    private String id;

    private Author author;

    private String title;
    private SubmissionState submissionState;
    private Location location;
    private String description;
    private SubmissionType submissionType;
    private List<Tag> tags;
    private List<Flag> flags;

    private String pin;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    public Submission() {
        this.id = UUID.randomUUID().toString();
        this.submissionState = SubmissionState.CREATED;
    }

    public Submission(SubmissionEntity entity) {
        new Submission(
            entity.getId(),
            new Author(entity.getAuthor()),
            entity.getTitle(),
            entity.getSubmissionState(),
            entity.getLocation(),
            entity.getDescription(),
            entity.getSubmissionType(),
            entity.getTags(),
            entity.getFlags(),
            entity.getPin(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }
}
