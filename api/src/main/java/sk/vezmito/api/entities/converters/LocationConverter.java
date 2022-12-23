package sk.vezmito.api.entities.converters;

import javax.persistence.AttributeConverter;
import sk.vezmito.api.model.Location;

public class LocationConverter implements AttributeConverter<Location, String> {

    @Override
    public String convertToDatabaseColumn(Location location) {
        return String.format("%s;%s",
            location.getLatitude(),
            location.getLongitude()
        );
    }

    @Override
    public Location convertToEntityAttribute(String s) {
        String[] splitted = s.split(";");
        return new Location(
            splitted[0],
            splitted[1]
        );
    }
}
