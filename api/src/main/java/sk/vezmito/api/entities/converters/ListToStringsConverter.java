package sk.vezmito.api.entities.converters;

import jakarta.persistence.AttributeConverter;
import java.util.Arrays;
import java.util.List;

public class ListToStringsConverter implements AttributeConverter<List<String>, String> {

    @Override
    public String convertToDatabaseColumn(List<String> tList) {
        return String.join(";;;", tList);
    }

    @Override
    public List<String> convertToEntityAttribute(String s) {
        return Arrays.asList(s.split(";;;"));
    }
}
