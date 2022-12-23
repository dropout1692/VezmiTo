package sk.vezmito.api.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.vezmito.api.model.Tag;
import sk.vezmito.api.dto.CreateTagDTO;
import sk.vezmito.api.services.TagService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/tags")
public class TagController {

    @Autowired
    private TagService service;

    @GetMapping("/get")
    public ResponseEntity<List<Tag>> getAllTags(){
        return service.getAllTags();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Tag> getTag(
        @PathVariable String id
    ){
        return service.getTag(id);
    }

    @PostMapping("/add")
    public ResponseEntity<Tag> addTag(
        @RequestBody CreateTagDTO dto
    ){
        return service.createTag(dto);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Tag> updateTag(
        @PathVariable String id,
        @RequestBody CreateTagDTO dto
    ){
        return service.updateTag(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> safeDeleteTag(
        @PathVariable String id
    ){
        return service.safeDeleteTag(id);
    }
}
