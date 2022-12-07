package sk.vezmito.api.services;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.entities.AuthorEntity;
import sk.vezmito.api.entities.SubmissionEntity;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.enums.SubmissionType;
import sk.vezmito.api.persistence.AuthorDAO;
import sk.vezmito.api.persistence.SubmissionDAO;
import sk.vezmito.api.security.PinUtil;

@Service
public class GeneratorService {

    public static final String GEN_DESCRIPTION = "This is a randomly generated submission.";
    public static final String GEN_HEX = "123456";
    public static final String GEN_TAG = "Generated";
    public static final String GEN_HOST = "vezmito-generated.sk";
    public static final String GEN_EMAIL = "0-%s@" + GEN_HOST;
    public static final double BRATISLAVA_LAT = 48.1486d;
    public static final double BRATISLAVA_LON = 17.1077d;

    @Autowired
    SubmissionDAO submissionDAO;

    @Autowired
    AuthorDAO authorDAO;

    public void wipeDatabase() {
        submissionDAO.deleteAll();
        authorDAO.deleteAll();
    }

    public void deleteAllGeneratedData() {

        List<SubmissionEntity> submissions = submissionDAO.findAll();
        submissions.stream()
            .filter(s -> {
                for (Tag tag : s.getTags()) {
                    if (tag.getName().equals(GEN_TAG)) {
                        return true;
                    }
                }
                return false;
            })
            .forEach(s -> submissionDAO.delete(s));

        List<AuthorEntity> authors = authorDAO.findAll();
        authors.stream()
            .filter(a -> a.getEmail().contains(GEN_HOST))
            .forEach(a -> authorDAO.delete(a));
    }

    public List<String> generateSubmissions(int count, SubmissionType type) {

        SubmissionEntity submissionEntity;
        SubmissionType actualType;
        List<String> idList = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            if (type == null) {
                List<SubmissionType> types = Arrays.asList(SubmissionType.values());
                Random random = new Random(System.currentTimeMillis());
                actualType = types.get(random.nextInt(types.size()));
            } else {
                actualType = type;
            }

            submissionEntity = generateSubmission(actualType);
            submissionDAO.save(submissionEntity);
            idList.add(submissionEntity.getId());
        }

        return idList;
    }

    private SubmissionEntity generateSubmission(SubmissionType type) {

        SubmissionEntity entity = new SubmissionEntity();
        String id = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();

        entity.setId(id);
        entity.setAuthor(getRandomAuthor());
        entity.setCreatedAt(now);
        entity.setUpdatedAt(now);
        entity.setDescription(GEN_DESCRIPTION);
        entity.setLocation(getRandomLocation());
        entity.setPin(PinUtil.randomPin());
        entity.setSubmissionState(SubmissionState.CREATED);
        entity.setSubmissionType(type);
        entity.setTags(Collections.singletonList(getGeneratedTag()));
        entity.setTitle(String.format("Submission %s", id));

        return submissionDAO.save(entity);
    }

    //todo: move random generators to respective classes? Location.random()
    public Location getRandomLocation() {

//        48.1486° N, 17.1077° E - Bratislava

        Random random = new SecureRandom();
        double deviationLat = BRATISLAVA_LAT + (random.nextDouble() * 2 - 1);
        double deviationLon = BRATISLAVA_LON + (random.nextDouble() * 2 - 1);

        return new Location(
            String.valueOf(deviationLat),
            String.valueOf(deviationLon)
        );
    }

    public Tag getGeneratedTag() {

        Tag tag = new Tag();
        tag.setId(UUID.randomUUID().toString());
        tag.setHexColor(GEN_HEX);
        tag.setName(GEN_TAG);
        tag.setPermanent(true);

        return tag;
    }

    private AuthorEntity getRandomAuthor() {

        Random random = new Random(System.currentTimeMillis());
        String email = String.format(GEN_EMAIL, random.nextInt(99999));
        String deviceID = UUID.randomUUID().toString();

        AuthorEntity author = new AuthorEntity();
        author.setDeviceID(deviceID);
        author.setEmail(email);

        authorDAO.save(author);

        return author;
    }
}
