
package com.klef.soa.docker.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.klef.soa.docker.entity.IrrigationSystem;
import com.klef.soa.docker.repository.IrrigationSystemRepository;
import com.klef.soa.docker.service.IrrigationSystemService;

@Service
public class IrrigationSystemServiceImpl
        implements IrrigationSystemService {

    private final IrrigationSystemRepository repository;

    public IrrigationSystemServiceImpl(
            IrrigationSystemRepository repository) {
        this.repository = repository;
    }

    @Override
    public IrrigationSystem addIrrigationSystem(
            IrrigationSystem system) {
        system.setSystemName(system.getSystemName().trim());
        system.setSystemType(system.getSystemType().trim());
        return repository.save(system);
    }

    @Override
    public List<IrrigationSystem> getAllIrrigationSystems() {
        return repository.findAll();
    }

    @Override
    public IrrigationSystem getIrrigationSystemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Irrigation system not found with ID: " + id));
    }

    @Override
    public void deleteIrrigationSystem(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Irrigation system not found with ID: " + id);
        }

        repository.deleteById(id);
    }
}
