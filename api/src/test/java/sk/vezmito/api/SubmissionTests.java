package sk.vezmito.api;

import static org.assertj.core.api.Assertions.assertThat;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
import sk.vezmito.api.entities.SubmissionEntity;
import sk.vezmito.api.entities.TagEntity;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;
import sk.vezmito.api.model.Author;
import sk.vezmito.api.model.Location;
import sk.vezmito.api.model.Submission;
import sk.vezmito.api.model.Tag;
import sk.vezmito.api.persistence.AuthorDAO;
import sk.vezmito.api.persistence.SubmissionDAO;
import sk.vezmito.api.persistence.TagDAO;
import sk.vezmito.api.services.GeneratorService;

@SpringBootTest
public class SubmissionTests {

    @Autowired
    private SubmissionDAO submissionDAO;

    @Autowired
    private AuthorDAO authorDAO;

    @Autowired
    private TagDAO tagDAO;

    @Autowired
    private GeneratorService generatorService;

    private final ObjectMapper mapper = new ObjectMapper();

    @AfterEach
    @BeforeEach
    private void cleanUpGeneratedData(){
        submissionDAO.findAll().stream()
            .filter(s -> s.getAuthor().getEmail().contains("generated-data"))
            .forEach(s -> submissionDAO.delete(s));

        authorDAO.findAll().stream()
            .filter(a -> a.getEmail().contains("generated-data"))
            .forEach(a -> authorDAO.delete(a));

        tagDAO.findAll().stream()
            .filter(t -> t.getName().equals("TEST"))
            .forEach(t -> tagDAO.delete(t));
    }

    @Test
    @DisplayName("Create a submission")
    public void createSubmission() {

        Random random = new Random();
        String randomPin = String.valueOf(random.nextInt(10000));

        Author author = generateAuthorEntity();

        Submission submission = new Submission();
        submission.setAuthor(author);
        submission.setTitle("Test Submission");
        LocalDateTime now = LocalDateTime.now();
        submission.setCreatedAt(now);
        submission.setUpdatedAt(now);
        submission.setDescription("This is a generated submission.");
        submission.setFlags(new ArrayList<>()); //todo: include in test
        Location location = generatorService.getRandomLocation();
        submission.setLocation(location);
        submission.setPin(randomPin);

        Tag tag = new Tag();
        tag.setColor("abcdef");
        tag.setName("TEST");
        tag.setPermanent(true);
        TagEntity tagEntity = mapper.convertValue(tag, TagEntity.class);
        tag = mapper.convertValue(tagDAO.save(tagEntity), Tag.class);

        submission.setTags(List.of(tag));
        submission.setSubmissionState(SubmissionState.CREATED);
        submission.setSubmissionType(SubmissionType.FREEBIE);

        SubmissionEntity entity = mapper.convertValue(submission, SubmissionEntity.class);
        submissionDAO.save(entity);

        //---------ASSERTIONS---------

        List<SubmissionEntity> foundEntities = findGeneratedData();
        assertThat(foundEntities.size() == 1);
        SubmissionEntity foundEntity = foundEntities.get(0);
        assertThat(foundEntity.getLocation().equals(location));
        assertThat(foundEntity.getCreatedAt().equals(now));
        assertThat(foundEntity.getUpdatedAt().equals(now));
        assertThat(foundEntity.getDescription().equals("This is a generated submission."));
        assertThat(foundEntity.getPin().equals(randomPin));
        assertThat(foundEntity.getTitle().equals("Test Submission"));
        assertThat(foundEntity.getFlags().size() == 0); //temporary
        assertThat(foundEntity.getSubmissionState().equals(SubmissionState.CREATED));
        assertThat(foundEntity.getSubmissionType().equals(SubmissionType.FREEBIE));
    }

    private Author generateAuthorEntity() {

        Random random = new Random();
        String randomNumber = String.valueOf(random.nextInt(100000));
        String randomUUID = UUID.randomUUID().toString();

        Author author = new Author();
        author.setEmail(String.format("%s@%sgenerated-data.sk", randomNumber, randomNumber));
        author.setPhone("+421901234567");
        author.setDeviceID(randomUUID);

        AuthorEntity entity = authorDAO.save(mapper.convertValue(author, AuthorEntity.class));
        return mapper.convertValue(entity, Author.class);
    }

    private List<SubmissionEntity> findGeneratedData(){
        return submissionDAO.findAll().stream()
            .filter(s -> s.getAuthor().getEmail().contains("generated-data"))
            .collect(Collectors.toList());
    }
}
