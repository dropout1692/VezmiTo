package sk.vezmito.api.entities;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
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

    public boolean wasUpdated(){
        return !createdAt.equals(updatedAt);
    }
}
