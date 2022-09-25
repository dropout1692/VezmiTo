package sk.vezmito.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.vezmito.api.entities.AlbumEntity;

public interface AlbumDAO extends JpaRepository<AlbumEntity, String> {

}
