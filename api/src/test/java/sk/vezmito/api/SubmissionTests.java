package sk.vezmito.api;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.common.Tag;
import sk.vezmito.api.dto.AuthorRequestDTO;
import sk.vezmito.api.dto.CreateSubmissionDTO;
import sk.vezmito.api.dto.UpdateSubmissionDTO;
import sk.vezmito.api.entities.SubmissionEntity;
import sk.vezmito.api.enums.SubmissionType;
import sk.vezmito.api.model.Submission;
import sk.vezmito.api.persistence.AuthorDAO;
import sk.vezmito.api.persistence.SubmissionDAO;
import sk.vezmito.api.services.SubmissionService;

@SpringBootTest
@Disabled
public class SubmissionTests {

    @Autowired
    SubmissionService submissionService;

    @Autowired
    AuthorDAO authorDAO;

    @Autowired
    SubmissionDAO submissionDAO;

    @Test
    @DisplayName("Create and update service test")
    public void submissionCreateUpdateTest(){

        AuthorRequestDTO authorRequestDTO = new AuthorRequestDTO(
            "+421910123456",
            "author@nongenerated123.org",
            null
        );

        Location location = new Location();
        location.setAltitude("0.0");
        location.setLatitude("1.0");
        location.setLongitude("5.0");

        CreateSubmissionDTO dto = new CreateSubmissionDTO(
            authorRequestDTO,
            "Testing sub title",
            SubmissionType.GIVEAWAY,
            new ArrayList<>(),
            List.of("http://testing.url1337.wtf/picture123.jpeg"),
            location,
            "Testing sub description"
        );

        ResponseEntity<Submission> createdSubmissionResponse = submissionService.createSubmission(dto);
        Submission createdSubmission = createdSubmissionResponse.getBody();
        assertThat(createdSubmission != null);

        Optional<SubmissionEntity> foundSubmission = submissionDAO.findById(createdSubmission.getId());
        assertThat(foundSubmission.isPresent());

        Tag tag = new Tag(
            "someId",
            "Test tag",
            "123FFF",
            true
        );

        Location updatedLocation = new Location();
        location.setAltitude("0.0");
        location.setLatitude("1.0");
        location.setLongitude("6.0");

        UpdateSubmissionDTO updateDTO = new UpdateSubmissionDTO(
            "Updated title",
            SubmissionType.GIVEAWAY,
            Collections.singletonList(tag),
            updatedLocation,
            "Changed description"
        );

        submissionService.updateSubmission(
            foundSubmission.get().getId(),
            updateDTO
        );

        foundSubmission = submissionDAO.findById(createdSubmission.getId());
        assertThat(foundSubmission.isPresent());
        SubmissionEntity submission = foundSubmission.get();
        assertThat(submission.getTitle().equals("Updated title"));
        assertThat(submission.getTags().size() == 1);
        assertThat(submission.getUpdatedAt().equals(submission.getCreatedAt()));
        assertThat(submission.getLocation().getLongitude().equals("6.0"));

        submissionDAO.delete(submission);
    }
}
