package sk.vezmito.api;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import sk.vezmito.api.model.Tag;
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
        CreateSubmissionDTO dto = new CreateSubmissionDTO(
            authorRequestDTO,
            "Testing sub title",
            SubmissionType.GIVEAWAY,
            new ArrayList<>(),
            "Testing name",
            "1.0",
            "5.0",
            "Testing sub description"
        );

        ResponseEntity<Submission> createdSubmissionResponse = submissionService.createSubmission(dto);
        Submission createdSubmission = createdSubmissionResponse.getBody();
        assertThat(createdSubmission != null);

        Optional<SubmissionEntity> foundSubmission = submissionDAO.findById(createdSubmission.getId());
        assertThat(foundSubmission.isPresent());

        Tag tag = new Tag(
            "someId",
            true,
            "Test tag",
            "123FFF"
        );
        UpdateSubmissionDTO updateDTO = new UpdateSubmissionDTO(
            "Updated title",
            SubmissionType.GIVEAWAY,
            Collections.singletonList(tag),
            "Changed name",
            "1.0",
            "6.0",
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
