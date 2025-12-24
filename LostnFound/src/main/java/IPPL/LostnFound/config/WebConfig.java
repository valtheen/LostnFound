package IPPL.LostnFound.config;

import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Get absolute path to uploads directory
        String uploadsPath = Paths.get("uploads").toAbsolutePath().toString();
        
        // Ensure path uses forward slashes (works on Windows too)
        String normalizedPath = uploadsPath.replace("\\", "/");
        
        // Add resource handler for uploads
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + normalizedPath + "/");
        
        System.out.println("Static resource handler configured for uploads at: " + normalizedPath);
    }
}

