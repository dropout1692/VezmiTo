package sk.vezmito.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.vezmito.api.dto.AuthorRequestDTO;
import sk.vezmito.api.entities.AuthorEntity;
import sk.vezmito.api.persistence.AuthorDAO;

@Service
public class AuthorService {

    @Autowired
    private AuthorDAO authorDAO;

    public AuthorEntity createAuthorEntity(AuthorRequestDTO dto) {

        //todo: improve when sober
        List<AuthorEntity> allAuthors = authorDAO.findAll();
        Optional<AuthorEntity> oldAuthor = findExistingAuthor(dto, allAuthors);

        if (oldAuthor.isPresent()) {

            AuthorEntity author = oldAuthor.get();

            if (dto.getPhone() != null) {
                author.setPhone(dto.getPhone());
            }

            if (dto.getEmail() != null) {
                author.setEmail(dto.getEmail());
            }

            if (dto.getDeviceID() != null) {
                author.setDeviceID(dto.getDeviceID());
            }

            authorDAO.save(author);
            return author;

        } else {

            AuthorEntity author = new AuthorEntity();

            author.setDeviceID(dto.getDeviceID());
            author.setEmail(dto.getEmail());
            author.setPhone(dto.getPhone());

            authorDAO.save(author);
            return author;
        }
    }

    private Optional<AuthorEntity> findExistingAuthor(
            AuthorRequestDTO dto,
            List<AuthorEntity> authors
    ) {
        return authors.stream()
                .filter(a -> {
                    boolean phoneMatch = false;
                    boolean emailMatch = false;
                    boolean deviceIDMatch = false;
                    if (a.getPhone() != null) {
                        phoneMatch = a.getPhone().equals(dto.getPhone());
                    }
                    if (a.getEmail() != null) {
                        emailMatch = a.getEmail().equals(dto.getEmail());
                    }
                    if (a.getDeviceID() != null) {
                        deviceIDMatch = a.getDeviceID().equals(dto.getDeviceID());
                    }
                    return phoneMatch || emailMatch || deviceIDMatch;
                })
                .findFirst();
    }

    //todo: handle author merging
}
