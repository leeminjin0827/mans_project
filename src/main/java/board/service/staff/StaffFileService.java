package board.service.staff;

import board.model.mapper.staff.StaffFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;

@Service
//@Transactional
public class StaffFileService {

    // 현재 작업 최상위 폴더 경로를 반환
    String baseDir = System.getProperty("user.dir");
    String uploadPath = baseDir + "/build/resources/main/static/upload/staff/";

    private final StaffFileMapper staffFileMapper;
    @Autowired
    public StaffFileService(StaffFileMapper staffFileMapper) { this.staffFileMapper = staffFileMapper; }

    /** 파일 업로드 */
    @Transactional(rollbackFor = Exception.class)
    public String uploadPhoto(MultipartFile multipartFile) {
        boolean result = false;
        System.out.println("확장자 = " + multipartFile.getContentType());
        System.out.println("용량 = " + multipartFile.getSize());
        System.out.println("파일명 = " + multipartFile.getOriginalFilename());
        System.out.println("존재 여부 = " + multipartFile.isEmpty());
        String uuid = UUID.randomUUID().toString();
        System.out.println("uuid = " + uuid);
        String fileName = uuid + "_" + multipartFile.getOriginalFilename().replaceAll("_", "-");
        String filePath = uploadPath + fileName;
        System.out.println("filePath = " + filePath);
        if(!new File(uploadPath).exists()) { new File(uploadPath).mkdir(); }
        File file = new File(filePath);
        try {
            multipartFile.transferTo(file);
        } catch(IOException e) {
            System.out.println(e);
            return null;
        }
        return fileName;
    }

    /** 파일 경로 찾기 */
    public String getFilePath(int staffNumber) {
        String fileName = staffFileMapper.getFilePath(staffNumber);
        System.out.println("fileName = " + fileName);
        String result = null;
        // File file = new File(result);
        // if(!file.exists()) { return null; }
        try {
            // FileInputStream fis = new FileInputStream(result);
            // long fileSize = file.length();
            // byte[] bytes = new byte[(int)fileSize];
            // fis.read(bytes); fis.close();
            fileName = URLEncoder.encode(fileName, "UTF-8");
            result = fileName;
            System.out.println("result = " + result);
        } catch(IOException e) {
            System.out.println(e);
            return null;
        }
        System.out.println("result  = " + result);
        return result;
    }

}
