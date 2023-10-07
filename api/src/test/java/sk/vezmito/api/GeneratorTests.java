package sk.vezmito.api;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sk.vezmito.api.entities.AuthorEntity;
import sk.vezmito.api.entities.SubmissionEntity;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;
import sk.vezmito.api.model.Submission;
import sk.vezmito.api.persistence.AuthorDAO;
import sk.vezmito.api.persistence.SubmissionDAO;
import sk.vezmito.api.security.PinUtil;
import sk.vezmito.api.services.GeneratorService;

@SpringBootTest
public class GeneratorTests {

    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    GeneratorService generatorService;

    @Autowired
    SubmissionDAO submissionDAO;

    @Autowired
    AuthorDAO authorDAO;

    //NEVER UNCOMMENT THIS UNLESS YOU KNOW WHAT YOU'RE DOING!
//    @Test
//    @DisplayName("[CAUTION!!] Wiping database [!!!]")
//    @Disabled
//    public void wipeDatabase() {
//        generatorService.wipeDatabase();
//        assertThat(submissionDAO.findAll().size() == 0);
//        assertThat(authorDAO.findAll().size() == 0);
//    }

    @Test
    @DisplayName("Generating and removing DB data")
    public void generateAndDeleteTest() {

        List<String> allIds = new ArrayList<>();

        int submissionTypeCount = SubmissionType.values().length;
        Map<SubmissionType, Boolean> foundTypeMap = new HashMap<>();
        for (SubmissionType type : SubmissionType.values()) {
            allIds.addAll(generatorService.generateSubmissions(1, type));
            foundTypeMap.put(type, false);
        }

        List<SubmissionEntity> generatedEntities = submissionDAO.findAll();
        List<Submission> generatedSubmissions = generatedEntities.stream()
            .map(e -> modelMapper.map(e, Submission.class))
            .toList();

        assertThat(generatedSubmissions.size() == submissionTypeCount);

        generatedSubmissions.forEach(e -> {
            foundTypeMap.put(e.getSubmissionType(), true);
        });

        foundTypeMap.forEach((key, value) -> assertThat(value == true));

        for (String id : allIds) {
            submissionDAO.deleteById(id);
            Optional<SubmissionEntity> submission = submissionDAO.findById(id);
            assertThat(submission.isEmpty());
        }

        generatorService.deleteAllGeneratedData();
    }

    @Test
    @DisplayName("Removing only generated DB data")
    public void selectiveDeleteTest() {

        LocalDateTime now = LocalDateTime.now();

        AuthorEntity nonGeneratedAuthor = new AuthorEntity();
        nonGeneratedAuthor.setPhone("+421910123456");
        nonGeneratedAuthor.setEmail("author@nongenerated123.org");
        authorDAO.save(nonGeneratedAuthor);

        SubmissionEntity nonGeneratedEntity = new SubmissionEntity();
        nonGeneratedEntity.setTitle("Testing!");
        nonGeneratedEntity.setAuthor(nonGeneratedAuthor);
        nonGeneratedEntity.setCreatedAt(now);
        nonGeneratedEntity.setUpdatedAt(now);
        nonGeneratedEntity.setDescription("Testing description");
        nonGeneratedEntity.setLocation(generatorService.getRandomLocation());
        nonGeneratedEntity.setPin(PinUtil.randomPin());
        nonGeneratedEntity.setSubmissionState(SubmissionState.CREATED);
        nonGeneratedEntity.setSubmissionType(SubmissionType.FREEBIE);
        nonGeneratedEntity.setTags(Collections.singletonList(generatorService.getGeneratedTag()));
        nonGeneratedEntity.setTitle(String.format("Testing submission %s", "NON-GEN"));

        submissionDAO.save(nonGeneratedEntity);

        List<String> generatedIds = generatorService.generateSubmissions(5, SubmissionType.FREEBIE);

        generatorService.deleteAllGeneratedData();

        for (String genId : generatedIds) {
            Optional<SubmissionEntity> entity = submissionDAO.findById(genId);
            assertThat(entity.isEmpty());
        }

        Optional<SubmissionEntity> nonGenEntity = submissionDAO
            .findById(nonGeneratedEntity.getId());
        assertThat(nonGenEntity.isPresent());

        String nonGenId = nonGeneratedEntity.getId();
        submissionDAO.delete(nonGeneratedEntity);
        authorDAO.delete(nonGeneratedAuthor);
        nonGenEntity = submissionDAO.findById(nonGenId);
        assertThat(nonGenEntity.isEmpty());

        //todo: currently doesn't test for author cleanup
    }
}
