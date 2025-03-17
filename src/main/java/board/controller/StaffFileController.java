package board.controller;

import board.service.StaffFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file/staff")
@CrossOrigin("http://localhost:5173")
public class StaffFileController {

    private final StaffFileService staffFileService;
    @Autowired
    public StaffFileController(StaffFileService staffFileService) { this.staffFileService = staffFileService; }

    /** 파일 업로드 */
    @PostMapping("/upload")
    public boolean uploadPhoto(@RequestParam(name = "file") MultipartFile multipartFile, @RequestParam(name = "staffNumber") int staffNumber) {
        System.out.println("multipartFile = " + multipartFile + ", staffNumber = " + staffNumber);
        boolean result = staffFileService.uploadPhoto(multipartFile, staffNumber);
        return result;
    }

    /** 파일 경로 찾기 */
    @GetMapping("/path")
    public String getPhotoPath(@RequestParam(name = "staff_number") int staffNumber) {

        String result = staffFileService.getFilePath(staffNumber);

        return result;
    }

}
