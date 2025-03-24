package board.service.room;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;

@Service
public class RfileService {

    // 최상위 폴더 반환
    String baseDir = System.getProperty("user.dir");
    // 빌드 경로
    String uploadPath = baseDir+"/build/resources/main/static/upload/room/";
    
    // [1] 업로드
    public String rFileUpload(MultipartFile multipartFile){
        System.out.println("RfileService.rFileUpload");
        System.out.println("파일이름 : " + multipartFile.getOriginalFilename());
        // UUID 문자열 생성
        String uuid = UUID.randomUUID().toString();
        // uuid + 파일명 // _ -> -
        String fileName = uuid + "_" + multipartFile.getOriginalFilename().replaceAll("_" , "-");
        System.out.println(fileName);
        // 업로드 기본경로 + uuid포함된 파일명
        String filePath = uploadPath + fileName;
        // 만일 업로드 경로가 존재하지 않으면 생성
        File fileHome = new File( uploadPath );
        System.out.println( fileHome );
        if( !fileHome.exists() ) { fileHome.mkdirs(); }
        // File 클래스 생성
        File file = new File( filePath );
        // 경로에 업로드
        try{ multipartFile.transferTo( file );
        }catch ( IOException e ) { System.out.println( e ); return null; } // 실패시 null
        return fileName; // 업로드 성공시 파일명 반환
    } // f end

    // [2] 다운로드
    public void rFileDownload(String filename, HttpServletResponse resp ){
        System.out.println("RfileService.rFileDownload");
        // 다운로드 받을 파일명과 업로드 경로 조합
        String downloadPath = uploadPath + filename;
        // 경로가 존재하지 않으면 리턴
        File file = new File( downloadPath );
        if( !file.exists() ){ return; } // 함수 종료
        // 업로드된 파일을 자바로 가져오기(바이트)
        try {
            // 파일 입력스트림 객체 생성
            FileInputStream fin = new FileInputStream(downloadPath);
            // 파일 용량만큼 배열 선언
            long fileSize = file.length();
            byte[] bytes = new byte[(int) fileSize];
            // 파일 입력 스트림 객체로 파일 읽어오기
            fin.read(bytes);
            // 파일 스트림 닫기
            fin.close();
        // 가져온 바이트배열을 사용자에게 응답
            String oldFilename = URLEncoder.encode( filename.contains("_") ? filename.split("_")[1] : filename , "UTF-8" );
            resp.setHeader( "Content-Disposition" , "attachment;filename="+oldFilename );
            // 서블릿 출력 스트림 객체 생성
            ServletOutputStream fout = resp.getOutputStream();
            // 스트림 이용해서 바이트 내보내기
            fout.write( bytes );
            // 서블릿 출력스트림 객체 닫기
            fout.close();
        }catch ( IOException e ) { System.out.println( e ); }
    } // f end

    // [3] 삭제
    public boolean rFileDelete( String filename ){
        System.out.println("RfileService.rFileDelete");
        // 업로드 경로 와 삭제할 파일명 연결
        String filePath = uploadPath + filename;
        File file = new File( filePath );
        if( file.exists() ){ // 존재하면 true , 없으면 false
            file.delete(); // 파일삭제
            return true;
        } // if end
        return false;
    } // f end
    
} // c end
