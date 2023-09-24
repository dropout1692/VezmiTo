package sk.vezmito.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Comment {

    private Author author;
    private Long createdAt;
    private String text;
}
