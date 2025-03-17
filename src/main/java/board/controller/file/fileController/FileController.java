package board.controller.file.fileController;

import board.controller.file.fileService.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;// @RequiredArgsConstructor  생성자 간단히 만들기

    //업로드
    @PostMapping("/upload")
    public String fileUpload(MultipartFile multipartFile) {
        System.out.println("FileService.fileUpload");
        System.out.println("multipartFile = " + multipartFile);
        String result= fileService.fileUpload(multipartFile);
        return result;
    }


}
