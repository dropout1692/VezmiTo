package sk.vezmito.api;

import static org.assertj.core.api.Assertions.assertThat;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sk.vezmito.api.entities.AuthorEntity;
import sk.vezmito.api.model.Author;
import sk.vezmito.api.persistence.AuthorDAO;

@SpringBootTest
public class AuthorTests {

    @Autowired
    private AuthorDAO dao;

    private final ObjectMapper mapper = new ObjectMapper();

    @AfterEach
    @BeforeEach
    private void cleanUpGeneratedData(){
        dao.findAll().stream()
            .filter(a -> a.getEmail().contains("generated-data"))
            .forEach(a -> dao.delete(a));
    }

    @Test
    @DisplayName("Create an author")
    public void createAuthor(){

        Random random = new Random();
        String randomNumber = String.valueOf(random.nextInt(100000));
        String randomUUID = UUID.randomUUID().toString();

        Author author = new Author();
        author.setEmail(String.format("%s@%sgenerated-data.sk", randomNumber, randomNumber));
        author.setPhone("+421901234567");
        author.setDeviceID(randomUUID);

        AuthorEntity entity = mapper.convertValue(author, AuthorEntity.class);
        dao.save(entity);

        //---------ASSERTIONS---------

        List<AuthorEntity> foundEntities = findGeneratedData();
        assertThat(foundEntities.size() == 1);
        AuthorEntity foundEntity = foundEntities.get(0);
        assertThat(foundEntity.getDeviceID().equals(randomUUID));
        assertThat(String.format("%s@%sgenerated-data.sk", randomNumber, randomNumber));
        assertThat("+421901234567");
    }

    private List<AuthorEntity> findGeneratedData(){
        return dao.findAll().stream()
            .filter(a -> a.getEmail().contains("generated-data"))
            .collect(Collectors.toList());
    }
}
