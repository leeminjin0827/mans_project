package board.service;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {

    String baseDir = System.getProperty("user.dir"); //현재 최상위 폴더 반환

    String uploadPath = baseDir+"/build/resources/main/static/upload/";


    public String fileUpload(MultipartFile multipartFile){
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid +"_"+multipartFile.getOriginalFilename().replaceAll("_","-");
        String filePath = uploadPath +fileName;
        // 경로 설정

        File file = new File(filePath); //파일경로 객체 생성
        try {
            multipartFile.transferTo(file);
        } catch (IOException e) {
            System.out.println(e);
            return null; //업로드 실패시 null 반환
        }
        return fileName; //업로드 성공시 파일명 반환
    }// f end

}//c end
