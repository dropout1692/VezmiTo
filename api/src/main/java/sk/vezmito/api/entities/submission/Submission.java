package sk.vezmito.api.entities.submission;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.common.Album;
import sk.vezmito.api.common.Author;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.enums.SubmissionState;

@Getter
@Setter
public class Submission {

    private final String id;

    private Author author;

    private String title;
    private SubmissionState submissionState;
    private Location location;
    private String description;
    private List<Tag> tags;

    private String pin;
    private Long createdAt;
    private Long updatedAt;
    private Long deleteAt;

    private Album photos;
//    private List<Comment> comments;

    public Submission() {
        this.id = UUID.randomUUID().toString();
        this.submissionState = SubmissionState.CREATED;
    }
}
