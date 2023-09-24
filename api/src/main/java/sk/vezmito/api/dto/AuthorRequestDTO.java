package sk.vezmito.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthorRequestDTO {

    private String phone;
    private String email;
    private String deviceID;
}
