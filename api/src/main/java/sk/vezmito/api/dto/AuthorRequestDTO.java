package sk.vezmito.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthorRequestDTO {

    private String phone;
    private String email;
    private String deviceID;
}
