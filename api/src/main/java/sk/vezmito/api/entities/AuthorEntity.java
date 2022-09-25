package sk.vezmito.api.entities;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sk.vezmito.api.entities.converters.ListToStringsConverter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "authors")
public class AuthorEntity {

    @Id
    @GeneratedValue
    private String id;

    @Convert(converter = ListToStringsConverter.class)
    private List<String> phone;

    @Convert(converter = ListToStringsConverter.class)
    private List<String> email;

    @Convert(converter = ListToStringsConverter.class)
    @Column(name = "device_id")
    private List<String> deviceID;
}
