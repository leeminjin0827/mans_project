package board.controller.room;

import board.service.room.RfileService;
import jakarta.servlet.http.HttpServletResponse;
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
    // http://localhost:8081/room/file
    @GetMapping("")
    public void rFileDownload(@RequestParam String filename , HttpServletResponse resp ){
        System.out.println("RfileController.rFileDownload");
        rfileService.rFileDownload( filename , resp );
    } // f end

    // [3] 삭제
    // http://localhost:8081/room/file
    @DeleteMapping("")
    public boolean rFileDelete(@RequestParam String filename ){
        System.out.println("RfileController.rFileDelete");
        boolean result = rfileService.rFileDelete( filename );
        return result;
    } // f end

} // c end
