package board.controller.staff;

import board.service.staff.StaffFileService;
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
    public String uploadPhoto(@RequestParam(name = "file") MultipartFile multipartFile, @RequestParam(name = "staffNumber") int staffNumber) {
        System.out.println("multipartFile = " + multipartFile + ", staffNumber = " + staffNumber);
        String result = staffFileService.uploadPhoto(multipartFile);
        return result;
    }

    /** 파일 경로 찾기 */
    @GetMapping("/path")
    public String getPhotoPath(@RequestParam(name = "staff_number") int staffNumber) {

        String result = staffFileService.getFilePath(staffNumber);

        return result;
    }

}
