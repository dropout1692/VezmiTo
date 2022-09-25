package sk.vezmito.api.services;

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

        AuthorEntity authorEntity = findExistingAuthor(dto);

        if (authorEntity != null) {
            return authorEntity;
        } else {
            //todo: actually create a new author
            return null;
        }
    }

    //todo: getAuthor phone/email/devId ?
    //todo: deleteAuthor ?

    private AuthorEntity findExistingAuthor(AuthorRequestDTO author) {

        if (author.getEmail() != null) {
            AuthorEntity foundAuthor = authorDAO.findByEmail(author.getEmail());
            if (foundAuthor != null) {
                return mergeAuthors(author, foundAuthor);
            }
        }

        if (author.getPhone() != null) {
            AuthorEntity foundAuthor = authorDAO.findByPhone(author.getPhone());
            if (foundAuthor != null) {
                return mergeAuthors(author, foundAuthor);
            }
        }

        if (author.getDeviceID() != null) {
            AuthorEntity foundAuthor = authorDAO.findByDeviceID(author.getDeviceID());
            if (foundAuthor != null) {
                return mergeAuthors(author, foundAuthor);
            }
        }

        return null;
    }

    private AuthorEntity mergeAuthors(AuthorRequestDTO author, AuthorEntity foundAuthor) {

        String phone = author.getPhone();
        String email = author.getEmail();
        String deviceID = author.getDeviceID();

        if (phone != null && !foundAuthor.getPhone().contains(phone)) {
            foundAuthor.getPhone().add(phone);
        }

        if (email != null && !foundAuthor.getEmail().contains(email)) {
            foundAuthor.getEmail().add(email);
        }

        if (deviceID != null && !foundAuthor.getDeviceID().contains(deviceID)) {
            foundAuthor.getDeviceID().add(deviceID);
        }

        return authorDAO.save(foundAuthor);
    }
}
