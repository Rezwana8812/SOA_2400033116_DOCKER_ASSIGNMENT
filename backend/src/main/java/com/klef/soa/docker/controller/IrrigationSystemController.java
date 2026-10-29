
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.docker.dto.IrrigationSystemRequest;
import com.klef.soa.docker.dto.IrrigationSystemResponse;
import com.klef.soa.docker.entity.IrrigationSystem;
import com.klef.soa.docker.service.IrrigationSystemService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/irrigation-systems")
@CrossOrigin("*")
public class IrrigationSystemController {

    private final IrrigationSystemService service;

    public IrrigationSystemController(IrrigationSystemService service) {
        this.service = service;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public IrrigationSystemResponse add(
            @Valid @RequestBody IrrigationSystemRequest request) {

        IrrigationSystem system = new IrrigationSystem();
        system.setSystemName(request.getSystemName());
        system.setSystemType(request.getSystemType());
        system.setAreaAcres(request.getAreaAcres());
        system.setAutomated(request.getAutomated());

        return new IrrigationSystemResponse(
                service.addIrrigationSystem(system));
    }

    @GetMapping("/displayAll")
    public List<IrrigationSystemResponse> displayAll() {
        return service.getAllIrrigationSystems()
                .stream()
                .map(IrrigationSystemResponse::new)
                .toList();
    }

    @GetMapping("/displayById/{id}")
    public IrrigationSystemResponse displayById(
            @PathVariable Long id) {
        return new IrrigationSystemResponse(
                service.getIrrigationSystemById(id));
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteIrrigationSystem(id);
    }
}
