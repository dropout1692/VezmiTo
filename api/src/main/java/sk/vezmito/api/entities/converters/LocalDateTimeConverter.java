package sk.vezmito.api.entities.converters;

import jakarta.persistence.AttributeConverter;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, String> {

    @Override
    public String convertToDatabaseColumn(LocalDateTime localDateTime) {
        return localDateTime.toInstant(ZoneOffset.UTC).toString();
    }

    @Override
    public LocalDateTime convertToEntityAttribute(String s) {
        return LocalDateTime.ofInstant(Instant.parse(s), ZoneOffset.UTC);
    }
}
