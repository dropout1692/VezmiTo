package sk.vezmito.api.services;

import java.time.LocalDateTime;
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

    @Autowired
    SubmissionDAO submissionDAO;

    @Autowired
    AuthorDAO authorDAO;

    public void wipeDatabase(){
        submissionDAO.deleteAll();
        authorDAO.deleteAll();
    }

    public void deleteAllGeneratedData(){

        List<SubmissionEntity> submissions = submissionDAO.findAll();
        submissions.stream()
            .filter(s -> {
                for(Tag tag : s.getTags()){
                    if(tag.getName().equals(GEN_TAG)){
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

    public void generateSubmissions(int count, SubmissionType type){

        SubmissionEntity submissionEntity;
        SubmissionType actualType;
        for(int i=0; i<count; i++){
            if(type == null){
                List<SubmissionType> types = Arrays.asList(SubmissionType.values());
                Random random = new Random(System.currentTimeMillis());
                actualType = types.get(random.nextInt(types.size()));
            }else{
                actualType = type;
            }

            submissionEntity = generateSubmission(actualType);
            submissionDAO.save(submissionEntity);
        }
    }

    private SubmissionEntity generateSubmission(SubmissionType type){

        SubmissionEntity entity = new SubmissionEntity();
        String id = UUID.randomUUID().toString();

        entity.setId(id);
        entity.setAuthor(getRandomAuthor());
        entity.setCreatedAt(LocalDateTime.now());
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
    private Location getRandomLocation(){

        Random random = new Random(System.currentTimeMillis());
        double minLat = -90.0d;
        double maxLat = 90.0d;
        double minLon = -180.0d;
        double maxLon = 180.0d;

        double randomLat = minLat + (maxLat + minLat) * random.nextDouble();
        double randomLon = minLon + (maxLon + minLon) * random.nextDouble();

        return new Location(String.valueOf(randomLat), String.valueOf(randomLon));
    }

    private AuthorEntity getRandomAuthor(){

        Random random = new Random(System.currentTimeMillis());
        String email = String.format(GEN_EMAIL, random.nextInt(99999));
        String deviceID = UUID.randomUUID().toString();

        AuthorEntity author = new AuthorEntity();
        author.setDeviceID(deviceID);
        author.setEmail(email);

        authorDAO.save(author);

        return author;
    }

    private Tag getGeneratedTag(){

        Tag tag = new Tag();
        tag.setId(UUID.randomUUID().toString());
        tag.setHexColor(GEN_HEX);
        tag.setName(GEN_TAG);
        tag.setPermanent(true);

        return tag;
    }
}
