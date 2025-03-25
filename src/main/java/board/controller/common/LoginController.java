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

    /** 로그인 상태 가져오기 */
    @GetMapping("/login/session")
    public int loginState(HttpServletRequest req) {
        System.out.println("LoginController.loginState");
        System.out.println("req = " + req);
        return loginService.loginState(req);
    }

    /** 내 정보 가져오기 */
    @GetMapping("/info")
    public StaffDto staffInfo(HttpServletRequest req) {

        HttpSession session = req.getSession();
        if(session == null) { return null; }


        return null;
    }

}
