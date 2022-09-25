package sk.vezmito.api.model;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.entities.AuthorEntity;

@Getter
@Setter
@AllArgsConstructor
public class Author {

    private String id;
    private List<String> phone;
    private List<String> email;
    private List<String> deviceID;

    public Author() {
        this.id = UUID.randomUUID().toString();
    }

    public Author(AuthorEntity entity) {
        new Author(
            entity.getId(),
            entity.getPhone(),
            entity.getEmail(),
            entity.getDeviceID()
        );
    }
}
