package sk.vezmito.api.entities.converters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import java.util.List;
import sk.vezmito.api.model.Flag;

public class FlagsToJsonConverter implements AttributeConverter<List<Flag>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Flag> flags) {
        try {
            return mapper.writeValueAsString(flags);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            //todo: add logging to whole project
            return null;
        }
    }

    @Override
    public List<Flag> convertToEntityAttribute(String s) {
        try {
            return mapper.readValue(s, new TypeReference<List<Flag>>() {
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
