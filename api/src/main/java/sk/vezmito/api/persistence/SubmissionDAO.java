package sk.vezmito.api.persistence;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sk.vezmito.api.entities.SubmissionEntity;

public interface SubmissionDAO extends JpaRepository<SubmissionEntity, String> {

    @Query("select s from submissions s where s.author = 'id'")
    List<SubmissionEntity> findAllByAuthorID(@Param("id") String authorID);
}
