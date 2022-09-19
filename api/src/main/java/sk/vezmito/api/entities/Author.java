package sk.vezmito.api.entities;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Author {

    private String id;
    private String phone;
    private String email;
    private List<String> deviceID;
}
