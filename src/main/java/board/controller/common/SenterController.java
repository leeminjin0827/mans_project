package board.controller.common;

import board.config.LoginSession;
import board.model.dto.common.SenterDto;
import board.service.common.SenterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/senter")
public class SenterController {

    @Autowired
    private SenterService senterService;
    @Autowired
    private LoginSession loginSession;

    // 문의등록
    @PostMapping("")
    public boolean sWrite(@RequestBody SenterDto senterDto , HttpServletRequest req ){

        // 등록 처리
        boolean result = senterService.sWrite( senterDto );
        System.out.println( result ? "등록성공" : "등록실패" );
        return result;
//        if( result == 0 ){
//            System.out.println("회원가입 실패");
//        }else if ( result == 1 ){
//            System.out.println("회원가입 성공");
//        }else if ( result == 2 ){
//            System.out.println("문의 제목은 3글자 이상 30글자 미만으로 작성해주세요.");
//        }else if ( result == 3 ){
//            System.out.println("작성자 이름을 10글자 이하로 작성해주세요.");
//        }
    } // f end

    // 문의전체조회
    @GetMapping("")
    public List<SenterDto> sFindAll(){
        List<SenterDto> list = senterService.sFindAll();
        return list;
    } // f end

    // 문의개별조회
    @GetMapping("/view")
    public SenterDto sView( @RequestParam("sno") int sno ) {
        return senterService.sView( sno );
    } // f end

    // 문의수정
    @PutMapping("")
    public boolean sUpdate( @RequestBody SenterDto senterDto ){
        return senterService.sUpdate( senterDto );
    } // f end

    // 문의삭제
    @DeleteMapping("")
    public boolean sDelete( @RequestParam("sno") int sno ){
        return senterService.sDelete( sno );
    } // f end

} // c end
