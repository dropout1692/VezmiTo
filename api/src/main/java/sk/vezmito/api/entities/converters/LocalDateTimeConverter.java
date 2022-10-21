package sk.vezmito.api.entities.converters;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import javax.persistence.AttributeConverter;

//todo:
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
