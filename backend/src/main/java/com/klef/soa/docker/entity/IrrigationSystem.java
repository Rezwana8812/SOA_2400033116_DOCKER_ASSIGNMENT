
package com.klef.soa.docker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class IrrigationSystem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "System name is required")
    @Size(max = 100, message = "System name cannot exceed 100 characters")
    private String systemName;

    @NotBlank(message = "System type is required")
    @Size(max = 50, message = "System type cannot exceed 50 characters")
    private String systemType;

    @NotNull(message = "Area in acres is required")
    @DecimalMin(value = "0.01", message = "Area must be greater than zero")
    private Double areaAcres;

    @NotNull(message = "Automated status is required")
    private Boolean automated;

    public IrrigationSystem() {
    }

    public Long getId() {
        return id;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getSystemType() {
        return systemType;
    }

    public void setSystemType(String systemType) {
        this.systemType = systemType;
    }

    public Double getAreaAcres() {
        return areaAcres;
    }

    public void setAreaAcres(Double areaAcres) {
        this.areaAcres = areaAcres;
    }

    public Boolean getAutomated() {
        return automated;
    }

    public void setAutomated(Boolean automated) {
        this.automated = automated;
    }
}
