package sk.vezmito.api.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.entities.converters.FlagsToJsonConverter;
import sk.vezmito.api.entities.converters.LocalDateTimeConverter;
import sk.vezmito.api.entities.converters.LocationConverter;
import sk.vezmito.api.entities.converters.TagsToJsonConverter;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;
import sk.vezmito.api.model.Flag;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "submissions")
public class SubmissionEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @NotNull
    @OneToOne
    private AuthorEntity author;

    private String title;

    @Column(name = "state")
    private SubmissionState submissionState;

    @Column(name = "type")
    private SubmissionType submissionType;

    @Convert(converter = LocationConverter.class)
    @Column(name = "geo_location")
    private Location location;

    private String description;

    @Convert(converter = TagsToJsonConverter.class)
    private List<Tag> tags;

    @Convert(converter = FlagsToJsonConverter.class)
    private List<Flag> flags;

    @NotNull
    private String pin;

    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime createdAt;

    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime updatedAt;

    public boolean wasUpdated() {
        return !createdAt.equals(updatedAt);
    }
}
