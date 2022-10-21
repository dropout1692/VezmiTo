package sk.vezmito.api.persistence;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import sk.vezmito.api.entities.SubmissionEntity;

public interface SubmissionDAO extends JpaRepository<SubmissionEntity, String> {

    List<SubmissionEntity> findAllByAuthor_Id(String authorID);
}
