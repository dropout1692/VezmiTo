package sk.vezmito.api.entities.submission;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.common.Album;
import sk.vezmito.api.common.Author;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.enums.SubmissionType;

@Getter
@Setter
public abstract class Submission {

    private final String id;

    private Author author;
    private SubmissionType submissionType;

    private String name;
    private Location location;
    private String description;
    private Album photos;

    public Submission() {
        this.id = UUID.randomUUID().toString();
    }
}
