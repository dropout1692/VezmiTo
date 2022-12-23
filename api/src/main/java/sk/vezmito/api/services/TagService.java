package sk.vezmito.api.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import sk.vezmito.api.entities.TagEntity;
import sk.vezmito.api.model.Tag;
import sk.vezmito.api.dto.CreateTagDTO;
import sk.vezmito.api.persistence.SubmissionDAO;
import sk.vezmito.api.persistence.TagDAO;

@Service
public class TagService {

    @Autowired
    private TagDAO tagDAO;

    @Autowired
    private SubmissionDAO submissionDAO;

    @Autowired
    private ModelMapper modelMapper;

    public ResponseEntity<List<Tag>> getAllTags() {

        List<TagEntity> foundTags = tagDAO.findAll();
        List<Tag> tags = foundTags.stream()
            .map(f -> modelMapper.map(f, Tag.class))
            .collect(Collectors.toList());

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", "Returning all tags.");

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(tags);
    }

    public ResponseEntity<Tag> getTag(String id) {

        Optional<TagEntity> tagEntity = tagDAO.findById(id);
        HttpHeaders headers = new HttpHeaders();

        if (tagEntity.isPresent()) {

            return ResponseEntity
                .ok()
                .headers(headers)
                .body(modelMapper.map(tagEntity.get(), Tag.class));

        } else {

            headers.add("message", String.format("Tag %s not found.", id));

            return ResponseEntity
                .notFound()
                .headers(headers)
                .build();
        }
    }

    public ResponseEntity<Tag> createTag(CreateTagDTO dto) {

        TagEntity tagEntity = new TagEntity();
        tagEntity.setName(dto.getName());
        tagEntity.setColor(dto.getColor());
        tagEntity.setPermanent(dto.isPermanent());

        TagEntity createdTag = tagDAO.save(tagEntity);
        Tag tag = modelMapper.map(createdTag, Tag.class);

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("Tag %s created.",
            tag.getId()
        ));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(tag);
    }

    public ResponseEntity<Tag> updateTag(String id, CreateTagDTO dto) {

        Optional<TagEntity> foundEntity = tagDAO.findById(id);
        HttpHeaders headers = new HttpHeaders();

        if (foundEntity.isPresent()) {

            TagEntity entity = foundEntity.get();
            entity.setName(dto.getName());
            entity.setColor(dto.getColor());
            entity.setPermanent(dto.isPermanent());
            TagEntity savedEntity = tagDAO.save(entity);

            Tag tag = modelMapper.map(savedEntity, Tag.class);
            headers.add("message", String.format("Tag %s updated.",
                savedEntity.getId()
            ));

            return ResponseEntity
                .ok()
                .headers(headers)
                .body(tag);

        } else {

            headers.add("message", String.format("Tag %s not found.", id));

            return ResponseEntity
                .notFound()
                .headers(headers)
                .build();
        }

    }

    public ResponseEntity<Void> safeDeleteTag(String id) {

        Optional<TagEntity> foundTagEntity = tagDAO.findById(id);
        HttpHeaders headers = new HttpHeaders();

        if (foundTagEntity.isPresent()) {

            TagEntity tagEntity = foundTagEntity.get();

            //sanitize submissions
            submissionDAO.findAll()
                .forEach(s -> {
                    List<TagEntity> tags = s.getTags();
                    for (int i = 0; i < tags.size(); i++) {
                        if (tags.get(i).getId().equals(id)) {
                            tags.remove(i);
                            s.setTags(tags);
                            submissionDAO.save(s);
                            break;
                        }
                    }
                });

            tagDAO.delete(tagEntity);

            return ResponseEntity
                .ok()
                .headers(headers)
                .body(null);

        } else {

            headers.add("message", String.format("Tag %s not found.", id));

            return ResponseEntity
                .notFound()
                .headers(headers)
                .build();
        }
    }
}
