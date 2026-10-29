
package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.entity.IrrigationSystem;

public interface IrrigationSystemService {

    IrrigationSystem addIrrigationSystem(IrrigationSystem system);

    List<IrrigationSystem> getAllIrrigationSystems();

    IrrigationSystem getIrrigationSystemById(Long id);

    void deleteIrrigationSystem(Long id);
}
