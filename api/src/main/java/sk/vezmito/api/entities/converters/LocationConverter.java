package sk.vezmito.api.entities.converters;

import javax.persistence.AttributeConverter;
import sk.vezmito.api.common.Location;

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
        Location location = new Location();
        String[] splitted = s.split(";");
        location.setLatitude(Double.parseDouble(splitted[0]));
        location.setLongitude(Double.parseDouble(splitted[1]));
        return location;
    }
}
