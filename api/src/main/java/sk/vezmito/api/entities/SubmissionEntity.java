package sk.vezmito.api.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.plexus.component.configurator.converters.basic.UrlConverter;
import org.hibernate.annotations.GenericGenerator;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.entities.converters.*;
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
    private Location location;

    private String description;

    @Convert(converter = UrlListConverter.class)
    @Column(name = "photos")
    private List<String> photoUrls;

    @Convert(converter = TagsToJsonConverter.class)
    private List<String> tags;

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
