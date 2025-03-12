package board.service;

import board.config.LoginSession;
import board.model.dto.LoginDto;
import board.model.mapper.LoginMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class LoginService {

    private final LoginMapper loginMapper;
    @Autowired
    public LoginService(LoginMapper loginMapper) { this.loginMapper = loginMapper; }

    /** 로그인 */
    public boolean staffLogin(LoginDto loginDto, HttpServletRequest req) {
        boolean result = false;
        System.out.println("LoginService.staffLogin");
        System.out.println("loginDto = " + loginDto);
        int staffNumber = loginMapper.staffLogin(loginDto).getStaffNumber();
        if(staffNumber > 0) {
            boolean check = LoginSession._loginStateCheck(staffNumber, req);
            if(check) {
                result = true;
            }
        }
        return result;
    }

    /** 로그아웃 */
    public boolean staffLogout(int loginNumber) {
        System.out.println("LoginService.staffLogout");
        System.out.println("loginNumber = " + loginNumber);
        return LoginSession.removeSession(loginNumber);
    }

    /** 로그인 상태 가져오기 */
    public int loginState(HttpServletRequest req) {
        System.out.println("LoginService.loginState");
        System.out.println("req = " + req);
        return new LoginSession().check(req.getSession());
    }

}
