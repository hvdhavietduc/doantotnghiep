package com.doantotnghiep.server.Translate;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
@Builder
public class TranslateFeature {
    @Id
    public String id;
    @Field
    public Boolean isRelease;
    @Field
    @Indexed(unique = true)
    public String name;
}
