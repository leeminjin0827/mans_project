package board.config;

import board.model.dto.staff.StaffDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class LoginSession {

    private final static ArrayList<HttpSession> sessionList = new ArrayList<>();

    /** 로그인 정보를 가져오는 함수 */
    public int check(HttpSession session) {
        int result = 0;
        for(int index = 0; index < sessionList.size(); index++) {
            HttpSession tempSession = sessionList.get(index);
            if(session.getId().equals(tempSession.getId())) {
                result = (Integer)tempSession.getAttribute("loginNumber");
            }
        }
        return result;
    }

//    /**
//     * sessionList에 로그인 관련 세션이 있는지 확인하는 함수<br/>
//     * 로그인 성공시 true를 반환
//     * */
//    public static boolean _loginStateCheck(int userNumber, HttpServletRequest req) {
//        boolean state = false;
//        System.out.println("sessionList size : " + sessionList.size());
//        if(sessionList.isEmpty()) {
//            HttpSession session = req.getSession();
//            System.out.println("isNew() : " + session.isNew());
//            session.setAttribute("loginNumber", userNumber);
//            sessionList.add(session);
//            state = true;
//        } else {
//            removeSession(userNumber);
//            HttpSession session = req.getSession();
//            System.out.println("isNew() : " + session.isNew());
//            session.setAttribute("loginNumber", userNumber);
//            addSession1(session);
//            state = true;
//        }
//        System.out.println("sessionList size : " + sessionList.size());
//        return state;
//    }

//    /** 새로운 세션을 저장 */
//    private static void addSession1(HttpSession session) {
//        sessionList.add(session);
//    }
//
//

    /** 세션 추가 */
    public static boolean addSession(StaffDto staffDto, HttpSession session) {
        System.out.println("LoginSession.addSession");
        System.out.println("sessionList.size() = " + sessionList.size());
        System.out.println("session.isNew() = " + session.isNew());
        System.out.println("addSession staffDto = " + staffDto + ", session = " + session);
        if(sessionList.isEmpty()) {
            session.setAttribute("staffInfo", staffDto);
            sessionList.add(session);
            System.out.println("add sessionList.size() = " + sessionList.size());
            return true;
        } else {
            removeSession(staffDto.getStaffNumber());
            session.setAttribute("staffInfo", staffDto);
            System.out.println("리무브 후 session.getAttribute = " + session.getAttribute("staffInfo"));
            System.out.println(">> 실행 Start");
            sessionList.add(session);
            System.out.println(">> 실행 End");
            System.out.println("after sessionList.size() = " + sessionList.size() + "\n\n");
            return true;
        }
    }

    /** 로그아웃 시 세션 삭제 */
    public static boolean logoutSession(HttpSession session) {
        boolean result = checkSession(session);
        return result;
    }

    /** 해당 세션을 모두 무효화 이후 세션을 지움 */
    public static boolean removeSession(int staffNumber) {
        boolean result = false;
        for(int index = 0; index < sessionList.size(); index++) {
            HttpSession tempSession = sessionList.get(index);
            StaffDto dto = (StaffDto)tempSession.getAttribute("staffInfo");
            System.out.println("dto = " + dto);
            int loginNumber = dto.getStaffNumber();
            System.out.println("loginNumber = " + loginNumber);
            System.out.println("staffNumber = " + staffNumber);
            // 세션의 값과 로그인을 시도한 유저의 번호가 같은지 확인
            if(loginNumber == staffNumber) {
                System.out.println(">> 세션의 값과 방금 로그인 한 값이 같음을 알려주세요");
                tempSession.removeAttribute("staffInfo");
                sessionList.remove(tempSession);
                // 세션 종료
               tempSession.invalidate();
               result = true;
               System.out.println(">> 이곳이 removeSession함수의 끝이라고 알려주세요");
            }
        }
        return result;
    }

    /** 세션 리스트에 세션이 존재하면 세션 삭제후 초기화 */
    public static boolean checkSession(HttpSession session) {
        boolean result = false;
        for(int index = 0; index < sessionList.size(); index++) {
            HttpSession tempSession = sessionList.get(index);
            System.out.println("session.getId() = " + session.getId());
            System.out.println("temp.getId() = " + tempSession.getId());
            if(session.getId().equals(tempSession.getId())) {
                System.out.println("before size = " + sessionList.size());
                sessionList.remove(tempSession);
                System.out.println("after size = " + sessionList.size());
                session.invalidate();
                result = true;
            }
        }
        return result;
    }

    /** 새로운 추가 부분 */



}
