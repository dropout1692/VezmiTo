package sk.vezmito.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import sk.vezmito.api.enums.FlagType;

@Data
@AllArgsConstructor
public class Flag {

    private Author author;
    private String postId;
    private FlagType flagType;
    private String flagName;
    private String description;
}
