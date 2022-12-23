package sk.vezmito.api.persistence;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sk.vezmito.api.entities.TagEntity;

public interface TagDAO  extends JpaRepository<TagEntity, String> {

    Optional<TagEntity> findByName(String name);
}
