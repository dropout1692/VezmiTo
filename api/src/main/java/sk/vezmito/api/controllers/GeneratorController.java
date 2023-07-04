package sk.vezmito.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sk.vezmito.api.enums.SubmissionType;
import sk.vezmito.api.services.GeneratorService;

@RestController
@RequestMapping("/api/generator")
public class GeneratorController {

    @Autowired
    GeneratorService service;

    //todo: holy shit make this more difficult
    @DeleteMapping("/wipe")
    public void wipeDatabase() {
        service.wipeDatabase();
    }

    @CrossOrigin
    @DeleteMapping("/deleteGenerated")
    public void removeGenerated() {
        service.deleteAllGeneratedData();
    }

    @CrossOrigin
    @PutMapping("/generate")
    public void generateSubmissions(
        @RequestParam int count,
        @RequestParam(required = false) SubmissionType type
    ) {
        service.generateSubmissions(count, type);
    }
}
