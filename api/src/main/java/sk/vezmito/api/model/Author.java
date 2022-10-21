package sk.vezmito.api.model;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sk.vezmito.api.entities.AuthorEntity;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Author {

    private String id;
    private String phone;
    private String email;
    private String deviceID;

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

    //todo: improve
    public String getCheckSum() {
        return String.format("%s-%s-%s",
            phone,
            email,
            deviceID
        );
    }
}
