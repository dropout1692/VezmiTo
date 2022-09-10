package sk.vezmito.api.services;

import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sk.vezmito.api.dto.CreateSubmissionDTO;
import sk.vezmito.api.entities.submission.Freebie;
import sk.vezmito.api.entities.submission.Submission;

@Service
public class SubmissionService {

    public ResponseEntity<List<Submission>> getAllSubmissions() {

        //todo: impl

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", "Returning found submissions.");

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(null);
    }

    public ResponseEntity<Submission> getSubmission(String id) {

        //todo: impl

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", "Returning found submission.");

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(null);
    }

    public ResponseEntity<Void> deleteSubmission(String id) {

        //todo: impl

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("Sumbission %s deleted.", id));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(null);
    }

    public ResponseEntity<Submission> createSubmission(CreateSubmissionDTO dto){

        //todo: impl

        Freebie tempSubmission = new Freebie();

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("Submission %s created.",
            tempSubmission.getId()
        ));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(tempSubmission);
    }

    public ResponseEntity<Void> addPhotosToSubmission(String id, List<MultipartFile> files) {

        //todo: impl

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("%s photo(s) added to submission %s.",
            files.size(),
            id
        ));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(null);
    }
}
