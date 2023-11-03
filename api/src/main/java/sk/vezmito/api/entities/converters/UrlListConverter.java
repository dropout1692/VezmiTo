package sk.vezmito.api.entities.converters;

import jakarta.persistence.AttributeConverter;

import java.util.ArrayList;
import java.util.List;

public class UrlListConverter implements AttributeConverter<List<String>, String> {
    @Override
    public String convertToDatabaseColumn(List<String> strings) {
        return String.join(",", strings);
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        return new ArrayList<>(List.of(s.split(",")));
    }
}