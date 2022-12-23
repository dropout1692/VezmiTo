package sk.vezmito.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateTagDTO {

    private String name;
    private String color;
    private boolean isPermanent;
}
