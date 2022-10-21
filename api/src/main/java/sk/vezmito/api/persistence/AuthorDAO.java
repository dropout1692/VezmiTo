package sk.vezmito.api.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sk.vezmito.api.entities.AuthorEntity;

public interface AuthorDAO extends JpaRepository<AuthorEntity, String> {

    @Query("SELECT a FROM AuthorEntity a WHERE a.email LIKE :email")
    AuthorEntity findByEmails(@Param("email") String email);

    @Query("SELECT a FROM AuthorEntity a WHERE a.phone LIKE :phone")
    AuthorEntity findByPhones(@Param("phone") String phone);

    @Query("SELECT a FROM AuthorEntity a WHERE a.deviceID LIKE :deviceID")
    AuthorEntity findByDeviceIDs(@Param("deviceID") String deviceID);
}
