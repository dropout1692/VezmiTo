package sk.vezmito.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import sk.vezmito.api.entities.AlbumEntity;

@Getter
@Setter
@AllArgsConstructor
public class Album {

    private String id;

    public Album(AlbumEntity entity) {
        new Album(
            entity.getId()
        );
    }
}
