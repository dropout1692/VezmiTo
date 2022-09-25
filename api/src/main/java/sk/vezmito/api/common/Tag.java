package sk.vezmito.api.common;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Tag {

    private String id;
    private boolean permanent;
    private String name;
    private String hexColor;
}
