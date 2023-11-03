package sk.vezmito.api.entities.converters;

import jakarta.persistence.AttributeConverter;
import sk.vezmito.api.common.Location;

public class LocationConverter implements AttributeConverter<Location, String> {

    @Override
    public String convertToDatabaseColumn(Location location) {
        return String.format("%s;%s;%s",
                location.getLatitude(),
                location.getLongitude(),
                location.getAltitude()
        );
    }

    @Override
    public Location convertToEntityAttribute(String s) {
        String[] splitted = s.split(";");
        return new Location(
                splitted[0],
                splitted[1],
                splitted[2]
        );
    }
}
