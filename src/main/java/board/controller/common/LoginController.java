package board.controller.common;

import board.config.LoginSession;
import board.model.dto.staff.StaffDto;
import board.service.common.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/staff")
@CrossOrigin("http://localhost:5173")
public class LoginController {

    private final LoginService loginService;
    @Autowired
    public LoginController(LoginService loginService) { this.loginService = loginService; }

    /** 로그인 */
    @PostMapping("/login")
    public boolean staffLogin(@RequestBody() StaffDto staffDto, HttpServletRequest req) {
        System.out.println("LoginController.staffLogin");
        System.out.println("staffDto = " + staffDto);
        StaffDto result = loginService.staffLogin(staffDto);
        System.out.println("result = " + result);
        if(result == null) {
            return false;
        } else {
            HttpSession session = req.getSession();
            boolean result2 = LoginSession.addSession(result, session);
            System.out.println("result2 = " + result2);
            System.out.println("여기가 실행되면 끝\n\n");
            // 세션 유지시간 10분
            // session.setMaxInactiveInterval(60 * 10);
            return result2;
        }
    }

    /** 로그아웃 */
    @GetMapping("/logout")
    public boolean staffLogout(HttpServletRequest req) {
        System.out.println("LoginController.staffLogout");
        System.out.println("req = " + req);
        HttpSession session = req.getSession();
        if(session == null) { return false; }
        return loginService.staffLogout(session);
    }

    /** 로그인 상태 가져오기<br/> 사용안함 */
    @GetMapping("/login/session")
    public StaffDto loginState(HttpServletRequest req) {
        System.out.println("LoginController.loginState");
        System.out.println("req = " + req);
        return loginService.loginState(req);
    }

    /** 내 정보 가져오기 */
    @GetMapping("/info")
    public StaffDto staffInfo(HttpServletRequest req) {
        HttpSession session = req.getSession();
        if(session == null) { return null; }
        // 로그인 성공 시 저장한 loginDto와 로그인 정보를 꺼낸다.
        StaffDto result = new LoginSession().check(session);
        // Object object = session.getAttribute("staffDto");
        // 세션에 저장된 자료들을 모두 Object타입이므로 타입 변환
        // StaffDto staffDto = (StaffDto)object;
        System.out.println("여기??");
        System.out.println("staffDto = " + result);
        return result;
    }

    /** 권한 인증 */
    @GetMapping("/authority")
    public boolean checkAuthority(HttpServletRequest req) {
        HttpSession session = req.getSession();
        if(session == null) { return false; }
        StaffDto result = new LoginSession().check(session);
        if(result.getStaffRank() == 0) { return true; }
        else { return false; }
    }

}
