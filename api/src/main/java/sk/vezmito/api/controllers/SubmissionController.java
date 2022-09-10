package sk.vezmito.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sk.vezmito.api.dto.CreateSubmissionDTO;
import sk.vezmito.api.entities.submission.Submission;
import sk.vezmito.api.services.SubmissionService;

@RestController
@RequestMapping("/api/v1/submissions")
public class SubmissionController {

    private final SubmissionService service;

    @Autowired
    public SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @GetMapping("/get")
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        return service.getAllSubmissions();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Submission> getSubmission(
        @PathVariable String id
    ) {
        return service.getSubmission(id);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSubmission(
        @PathVariable String id
    ) {
        return service.deleteSubmission(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Submission> createSubmission(
        @RequestBody CreateSubmissionDTO dto
    ) {
        return service.createSubmission(dto);
    }

    @PostMapping("/addPhotos/{id}")
    public ResponseEntity<Void> addPhotos(
        @PathVariable String id,
        @RequestBody List<MultipartFile> files
    ) {
        return service.addPhotosToSubmission(id, files);
    }
}
