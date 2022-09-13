package sk.vezmito.api.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.common.Author;
import sk.vezmito.api.common.Tag;

@Getter
@Setter
@AllArgsConstructor
public class CreateSubmissionDTO {

    private Author author;
    private List<Tag> category;

    private String name;
    private String gpsX;
    private String gpsY;
    private String description;
}
