package board.service;

import board.config.LoginSession;
import board.model.dto.LoginDto;
import board.model.dto.StaffDto;
import board.model.mapper.LoginMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
    public StaffDto staffLogin(StaffDto staffDto) {
        boolean result = false;
        System.out.println("LoginService.staffLogin");
        System.out.println("staffDto = " + staffDto);
        StaffDto staff = loginMapper.staffLogin(staffDto);
        return staff;
    }

    /** 로그아웃 */
    public boolean staffLogout(HttpSession session) {
        System.out.println("LoginService.staffLogout");
        System.out.println("session = " + session);
        return LoginSession.logoutSession(session);
    }

    /** 로그인 상태 가져오기 */
    public int loginState(HttpServletRequest req) {
        System.out.println("LoginService.loginState");
        System.out.println("req = " + req);
        return new LoginSession().check(req.getSession());
    }

    /** 내 정보 가져오기 */
    public StaffDto staffInfo(HttpServletRequest req) {
        return null;
    }

}
