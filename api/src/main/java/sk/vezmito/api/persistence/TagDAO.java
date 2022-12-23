package sk.vezmito.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import sk.vezmito.api.entities.TagEntity;

public interface TagDAO extends JpaRepository<TagEntity, Long> {
}
