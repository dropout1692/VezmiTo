package sk.vezmito.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sk.vezmito.api.entities.AuthorEntity;

public interface AuthorDAO extends JpaRepository<AuthorEntity, String> {

    @Query("select a from authors a where a.email like '%email%'")
    AuthorEntity findByEmail(@Param("email") String email);

    @Query("select a from authors a where a.phone like '%phone%'")
    AuthorEntity findByPhone(@Param("phone") String phone);

    @Query("select a from authors a where a.device_id like '%id%'")
    AuthorEntity findByDeviceID(@Param("id") String deviceID);
}
