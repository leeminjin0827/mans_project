package board.service.room;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class RfileService {

    // 최상위 폴더 반환
    String baseDir = System.getProperty("user.dir");
    // 빌드 경로
    String uploadPath = baseDir+"/buile/resources/main/static/upload/room/";
    
    // [1] 업로드
    public String rFileUpload(MultipartFile multipartFile){
        System.out.println("RfileService.rFileUpload");
        // UUID 문자열 생성
        String uuid = UUID.randomUUID().toString();
        // uuid + 파일명 // _ -> -
        String fileName = uuid + "_" + multipartFile.getOriginalFilename().replaceAll("_" , "-");
        // 업로드 기본경로 + uuid포함된 파일명
        String filePath = uploadPath + fileName;
        // 만일 업로드 경로가 존재하지 않으면 생성
        File fileHome = new File( uploadPath );
        if( !fileHome.exists() ) { fileHome.mkdir(); }
        // File 클래스 생성
        File file = new File( filePath );
        // 경로에 업로드
        try{ multipartFile.transferTo( file );
        }catch ( IOException e ) { System.out.println( e ); return null; } // 실패시 null
        return fileName; // 업로드 성공시 파일명 반환
    } // f end

    // [2] 다운로드
    
    // [3] 삭제
    
} // c end
