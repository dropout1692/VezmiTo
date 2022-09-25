package sk.vezmito.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.vezmito.api.dto.CreateSubmissionDTO;
import sk.vezmito.api.dto.UpdateSubmissionDTO;
import sk.vezmito.api.model.Submission;
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

    @DeleteMapping("/delete/{id}")
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

    @PostMapping("/update/{id}")
    public ResponseEntity<Submission> updateSubmission(
        @PathVariable String id,
        @RequestBody UpdateSubmissionDTO dto
    ) {
        return service.updateSubmission(id, dto);
    }
}
