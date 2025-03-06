package board.service;

import board.config.LoginSession;
import board.model.dto.UserDto;
import board.model.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    final private UserMapper userMapper;
    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    /** 회원가입 */
    public boolean _signup(UserDto userDto) {
        boolean result = userMapper._signup(userDto);
        return result;
    }

    /**
     * 로그인<br/>
     * 반환값이 true이면 로그인 성공<br/>
     * 반환값이 false이면 로그인 실패
     * */
    public boolean _login(UserDto userDto, HttpServletRequest req) {
        boolean result = false;
        List<UserDto> list = userMapper._login();

        System.out.println("<sessionList before>");
        LoginSession.sessionList.forEach(httpSession -> {
            System.out.println(httpSession.getAttribute("loginNumber"));
        });
        System.out.println("</sessionList before>");

        for(int index = 0; index < list.size(); index++) {
            UserDto user = list.get(index);
            System.out.println(user);
            if(userDto.getId().equals(user.getId()) && userDto.getPassword().equals(user.getPassword())) {
                boolean state = LoginSession._loginStateCheck(user.getUserNumber(), req);
                // state값이 true일 경우 정상적으로 로그인 됨
                if(state) {
                    result = true;
                }
                break;
            }
        }

        System.out.println("<sessionList after>");
        LoginSession.sessionList.forEach(httpSession -> {
            System.out.println(httpSession.getAttribute("loginNumber"));
        });
        System.out.println("</sessionList after>");

        return result;
    }

}
