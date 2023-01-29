package sk.vezmito.api.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;

@Getter
@Setter
@AllArgsConstructor
public class Submission {

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
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;

    public Submission() {
        this.id = UUID.randomUUID().toString();
        this.submissionState = SubmissionState.CREATED;
    }
}
