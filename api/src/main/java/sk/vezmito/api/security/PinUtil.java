package sk.vezmito.api.security;

import java.util.Random;

public class PinUtil {

    public static String randomPin() {
        Random random = new Random(System.currentTimeMillis());
        int pin = random.nextInt(100000);
        return String.format("%05d", pin);
    }
}
