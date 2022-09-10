package sk.vezmito.api.services;

import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MediaService {

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

    public ResponseEntity<Void> removePhotosFromSubmission(String id, List<String> photoIDs) {

        //todo: impl

        HttpHeaders headers = new HttpHeaders();
        headers.add("message", String.format("%s photo(s) removed from submission %s.",
            photoIDs.size(),
            id
        ));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(null);
    }
}
