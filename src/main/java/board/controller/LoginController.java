package board.controller;

import board.model.dto.LoginDto;
import board.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
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
    public boolean staffLogin(@RequestBody() LoginDto loginDto, HttpServletRequest req) {
        System.out.println("LoginController.staffLogin");
        System.out.println("loginDto = " + loginDto);
        return loginService.staffLogin(loginDto, req);
    }

    /** 로그아웃 */
    @PostMapping("/logout")
    public boolean staffLogout(@RequestBody() int loginNumber) {
        System.out.println("LoginController.staffLogout");
        System.out.println("loginNumber = " + loginNumber);
        return loginService.staffLogout(loginNumber);
    }

    /** 로그인 상태 가져오기 */
    @GetMapping("/login/session")
    public int loginState(HttpServletRequest req) {
        System.out.println("LoginController.loginState");
        System.out.println("req = " + req);
        return loginService.loginState(req);
    }

}
