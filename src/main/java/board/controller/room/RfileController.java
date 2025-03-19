package board.controller.room;

import board.service.room.RfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/room/file")
@RequiredArgsConstructor
public class RfileController {

    private final RfileService rfileService;

    // [1] 업로드
    // http://localhost:8081/room/file
    @PostMapping("")
    public String rFileUpload(MultipartFile multipartFile ){
        System.out.println("RfileController.rFileUpload");
        String result = rfileService.rFileUpload( multipartFile );
        return result;
    } // f end

    // [2] 다운로드
    @GetMapping("")
    public void rFileDownload(){
        System.out.println("RfileController.rFileDownload");
    } // f end

    // [3] 삭제
    @DeleteMapping("")
    public boolean rFileDelete(){
        System.out.println("RfileController.rFileDelete");
        return true;
    } // f end

} // c end
