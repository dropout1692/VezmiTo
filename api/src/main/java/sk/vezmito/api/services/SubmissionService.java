package sk.vezmito.api.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import sk.vezmito.api.common.Location;
import sk.vezmito.api.dto.AuthorRequestDTO;
import sk.vezmito.api.dto.CreateSubmissionDTO;
import sk.vezmito.api.dto.UpdateSubmissionDTO;
import sk.vezmito.api.entities.AuthorEntity;
import sk.vezmito.api.entities.SubmissionEntity;
import sk.vezmito.api.enums.SubmissionState;
import sk.vezmito.api.model.Submission;
import sk.vezmito.api.persistence.SubmissionDAO;
import sk.vezmito.api.security.PinUtil;

@Service
public class SubmissionService {

    @Autowired
    private AuthorService authorService;

    @Autowired
    private SubmissionDAO submissionDAO;

    public ResponseEntity<List<Submission>> getAllSubmissions() {

        List<SubmissionEntity> foundSubmissions = submissionDAO.findAll();
        List<Submission> submissions = foundSubmissions.stream()
            .map(Submission::new)
            .collect(Collectors.toList());

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", "Returning all submissions.");

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(submissions);
    }

    public ResponseEntity<Submission> getSubmission(String id) {

        Optional<SubmissionEntity> foundSubmission = submissionDAO.findById(id);
        HttpHeaders headers = new HttpHeaders();

        if (foundSubmission.isPresent()) {
            headers.add("message", String.format("Returning submission %s.", id));

            return ResponseEntity
                .ok()
                .headers(headers)
                .body(new Submission(foundSubmission.get()));

        } else {

            headers.add("message", String.format("Submission %s not found.", id));

            return ResponseEntity
                .notFound()
                .headers(headers)
                .build();
        }
    }

    public ResponseEntity<Void> deleteSubmission(String id) {

        Optional<SubmissionEntity> foundSubmission = submissionDAO.findById(id);
        foundSubmission.ifPresent(submissionEntity -> submissionDAO.delete(submissionEntity));

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("Submission %s deleted.", id));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(null);
    }

    public ResponseEntity<Submission> createSubmission(CreateSubmissionDTO dto) {

        AuthorRequestDTO authorDTO = dto.getAuthor();
        AuthorEntity author = authorService.createAuthorEntity(authorDTO);

        SubmissionEntity submissionEntity = new SubmissionEntity();
        submissionEntity.setAuthor(author);
        submissionEntity.setCreatedAt(LocalDateTime.now());
        submissionEntity.setDescription(dto.getDescription());
        submissionEntity.setLocation(new Location(dto.getGpsLatitude(), dto.getGpsLongitude()));
        submissionEntity.setPin(PinUtil.randomPin());
        submissionEntity.setSubmissionState(SubmissionState.CREATED);
        submissionEntity.setSubmissionType(dto.getSubmissionType());
        submissionEntity.setTags(dto.getTags());
        submissionEntity.setTitle(dto.getTitle());

        SubmissionEntity createdEntity = submissionDAO.save(submissionEntity);
        Submission submission = new Submission(createdEntity);

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("Submission %s created.",
            submission.getId()
        ));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(submission);
    }

    public ResponseEntity<Submission> updateSubmission(String id, UpdateSubmissionDTO dto) {

        Optional<SubmissionEntity> foundEntity = submissionDAO.findById(id);
        HttpHeaders headers = new HttpHeaders();

        if (foundEntity.isPresent()) {

            SubmissionEntity submissionEntity = foundEntity.get();

            submissionEntity.setUpdatedAt(LocalDateTime.now());
            submissionEntity.setDescription(dto.getDescription());
            submissionEntity.setLocation(new Location(dto.getGpsLatitude(), dto.getGpsLongitude()));
            submissionEntity.setSubmissionState(SubmissionState.CREATED);
            submissionEntity.setSubmissionType(dto.getSubmissionType());
            submissionEntity.setTags(dto.getTags());
            submissionEntity.setTitle(dto.getTitle());

            Submission submission = new Submission(submissionEntity);

            headers.add("message", String.format("Submission %s updated.",
                submission.getId()
            ));

            return ResponseEntity
                .ok()
                .headers(headers)
                .body(submission);

        } else {

            headers.add("message", String.format("Submission %s not found.", id));

            return ResponseEntity
                .notFound()
                .headers(headers)
                .build();
        }
    }
}
