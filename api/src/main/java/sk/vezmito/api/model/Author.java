package sk.vezmito.api.model;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Author {

    private String id;
    private String phone;
    private String email;
    private String deviceID;

    public Author() {
        this.id = UUID.randomUUID().toString();
    }
}
