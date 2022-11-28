package sk.vezmito.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sk.vezmito.api.services.MediaService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/media")
public class MediaController {

    private final MediaService service;

    @Autowired
    public MediaController(MediaService service) {
        this.service = service;
    }

    @PostMapping("/addPhotos/{id}")
    public ResponseEntity<Void> addPhotos(
        @PathVariable String id,
        @RequestBody List<MultipartFile> files
    ) {
        return service.addPhotosToSubmission(id, files);
    }

    @DeleteMapping("/removePhotos/{id}")
    public ResponseEntity<Void> removePhotos(
        @PathVariable String id,
        @RequestBody List<String> photoIDs
    ) {
        return service.removePhotosFromSubmission(id, photoIDs);
    }
}
