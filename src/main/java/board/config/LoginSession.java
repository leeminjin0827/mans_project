package board.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

public class LoginSession {
    public static ArrayList<HttpSession> sessionList = new ArrayList<>();

    public LoginSession() {
        // HttpSession session = req.getSession(false) == null ? req.getSession() : req.getSession(false);

    }

    public void _init() {

    }

    /** 로그인 정보를 가져오는 함수 */
    public int check(int userNumber) {
        int result = 0;
        for(int index = 0; index < sessionList.size(); index++) {
            HttpSession session = sessionList.get(index);
            int loginNumber = (Integer)session.getAttribute("loginNumber");
            if(loginNumber == userNumber) {
                result = loginNumber;
                     break;
            }
        }
        return result;
    }

    /**
     * sessionList에 로그인 관련 세션이 있는지 확인하는 함수<br/>
     * 로그인 성공시 true를 반환
     * */
    public static boolean _loginStateCheck(int userNumber, HttpServletRequest req) {
        boolean state = false;
        System.out.println("sessionList size : " + sessionList.size());
        if(sessionList.isEmpty()) {
            HttpSession session = req.getSession();
            System.out.println("isNew() : " + session.isNew());
            session.setAttribute("loginNumber", userNumber);
            sessionList.add(session);
            state = true;
        } else {
            removeSession(userNumber, req);
            HttpSession session = req.getSession();
            System.out.println("isNew() : " + session.isNew());
            session.setAttribute("loginNumber", userNumber);
            addSession(session);
            state = true;
        }
        System.out.println("sessionList size : " + sessionList.size());
        return state;
    }

    /** 해당 세션을 모두 무효화 */
    private static void removeSession(int userNumber, HttpServletRequest req) {
        for(int index = 0; index < sessionList.size(); index++) {
            HttpSession tempSession = sessionList.get(index);
            int loginNumber = (Integer)tempSession.getAttribute("loginNumber");
            // 세션의 값과 로그인을 시도한 유저의 번호가 같은지 확인
            if(loginNumber == userNumber) {
                // 세션 종료
               tempSession.invalidate();
               sessionList.remove(tempSession);
            }
        }
    }

    /** 새로운 세션을 저장 */
    private static void addSession(HttpSession session) {
        sessionList.add(session);
    }

}
