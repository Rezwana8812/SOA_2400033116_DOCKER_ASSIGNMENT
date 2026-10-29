
package com.klef.soa.docker.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI irrigationOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Irrigation System API")
                        .description(
                                "REST APIs for managing irrigation systems")
                        .version("1.0"));
    }
}
