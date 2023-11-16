package com.doantotnghiep.server.CrawWord;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.word.Example;
import com.doantotnghiep.server.word.Mean;
import com.doantotnghiep.server.word.Type;
import com.doantotnghiep.server.word.Word;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
@Service
@RequiredArgsConstructor
@ControllerAdvice
public class CrawWordService {
    private final static String url = "https://dictionary.cambridge.org";
    private final static String endpointWord = "/dictionary/english/";
    public Word crawWord(String word) throws IOException, ResponseException {
        String urlWord = url + endpointWord+ word;
        Document doc = Jsoup.connect(urlWord).get();
        Word wordCraw = new Word();
        wordCraw.setName(word);
        wordCraw.setPronunciationUK(crawPronunciationUK(doc));
        wordCraw.setPronunciationUS(crawPronunciationUS(doc));
        wordCraw.setTypes(crawTypes(doc));
        if(wordCraw.getTypes().isEmpty()){
            throw new ResponseException("Word not found", HttpStatus.NOT_FOUND, 404);
        }
        return wordCraw;
    }

    public String crawPronunciationUK(Document doc) {
        Element AudioPronunciationUK = doc.getElementById("audio1");
        if(AudioPronunciationUK == null){
            return "";
        }
        Element sourcePronunciationUK = AudioPronunciationUK.getElementsByTag("source").first();
        if(sourcePronunciationUK == null){
            return "";
        }
        String pronunciationUK = sourcePronunciationUK.attr("src");
        String urlPronunciationUK = url + pronunciationUK;
        return urlPronunciationUK;
    }
    public String crawPronunciationUS(Document doc) {
        Element AudioPronunciationUS = doc.getElementById("audio2");
        if(AudioPronunciationUS == null){
            return "";
        }
        Element sourcePronunciationUS = AudioPronunciationUS.getElementsByTag("source").first();
        if(sourcePronunciationUS == null){
            return "";
        }
        String pronunciationUS = sourcePronunciationUS.attr("src");
        String urlPronunciationUS = url + pronunciationUS;
        return urlPronunciationUS;
    }
    public List<Type> crawTypes(Document doc) {
        List<Type> typesList = new ArrayList<>();
        Element typesElement = doc.select(".entry-body").first();
        if(typesElement == null){
            return typesList;
        }
        List<Element> allTypeElement = typesElement.select(".pr.entry-body__el");

        for(Element typeElement: allTypeElement){
            Element header = typeElement.select(".pos-header.dpos-h").first();
            String type = "";
            if(header != null){
                type = header.select(".pos.dpos").first().text();
            }
            Type typeCraw = new Type(type);
            Element body = typeElement.select(".pos-body").first();
            if(body == null){
                continue;
            }
            List<Mean> means = crawMeans(body);
            typeCraw.means = means;
            typesList.add(typeCraw);
        }
        return typesList;
    }
    public List<Mean> crawMeans(Element body){
        List<Mean> meansList = new ArrayList<>();
        List<Element> meansElement = body.select(".pr.dsense ");
        for (Element meanElement: meansElement){
            Element meansBody = meanElement.select(".sense-body.dsense_b").first();
            if(meansBody == null){
                continue;
            }
            List<Element> means = meansBody.select(".def-block.ddef_block ");
            for(Element mean: means){
                Mean meanCraw = new Mean();
                Element levelAndConceptEnglishElement = mean.select(".ddef_h").first();
                if(levelAndConceptEnglishElement == null){
                    continue;
                }
                Element levelElement = levelAndConceptEnglishElement.select("span.epp-xref.dxref").first();
                String level = "";
                if(levelElement != null){
                    level = levelElement.text();
                }
                String conceptEnglish = "";
                Element conceptEnglishElement = levelAndConceptEnglishElement.select(".def.ddef_d.db").first();

                if(conceptEnglishElement != null){
                    conceptEnglish = conceptEnglishElement.text();
                }

                meanCraw.conceptEnglish = conceptEnglish;
                meanCraw.level = level;
                meanCraw.examples = crawExamples(mean);
                meansList.add(meanCraw);
            }
        }
        return meansList;
    }

    public List<Example> crawExamples(Element meanBody){
        List<Example> examplesList = new ArrayList<>();
        List<Element> examplesElement = meanBody.select(".eg.deg");
        for(Element exampleElement: examplesElement){
            Example example = new Example();
            example.example = exampleElement.text();
            example.meanOfExample="";
            examplesList.add(example);
        }
        return examplesList;
    }
}
