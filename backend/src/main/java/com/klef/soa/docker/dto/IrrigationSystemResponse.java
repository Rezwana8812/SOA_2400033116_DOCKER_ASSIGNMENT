
package com.klef.soa.docker.dto;

import com.klef.soa.docker.entity.IrrigationSystem;

public class IrrigationSystemResponse {

    private Long id;
    private String systemName;
    private String systemType;
    private Double areaAcres;
    private Boolean automated;

    public IrrigationSystemResponse() {
    }

    public IrrigationSystemResponse(IrrigationSystem system) {
        this.id = system.getId();
        this.systemName = system.getSystemName();
        this.systemType = system.getSystemType();
        this.areaAcres = system.getAreaAcres();
        this.automated = system.getAutomated();
    }

    public Long getId() {
        return id;
    }

    public String getSystemName() {
        return systemName;
    }

    public String getSystemType() {
        return systemType;
    }

    public Double getAreaAcres() {
        return areaAcres;
    }

    public Boolean getAutomated() {
        return automated;
    }
}
