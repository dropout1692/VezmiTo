package sk.vezmito.api.entities.converters;

import jakarta.persistence.AttributeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import sk.vezmito.api.common.Tag;

public class TagsToJsonConverter implements AttributeConverter<List<Tag>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Tag> tagList) {
        try {
            return mapper.writeValueAsString(tagList);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            //todo: add logging to whole project
            return null;
        }
    }

    @Override
    public List<Tag> convertToEntityAttribute(String s) {
        try {
            return mapper.readValue(s, new TypeReference<List<Tag>>() {
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
