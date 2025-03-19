package board.controller;

import board.model.dto.StaffDto;
import board.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping("/staff")
@CrossOrigin("http://localhost:5173")
public class StaffController {

    private final StaffService staffService;
    @Autowired
    public StaffController(StaffService staffService) {this.staffService = staffService;}

    // 유효성 검사 함수들

    /** 직원 등록 */
    @PostMapping("")
    public boolean staffRegister(@RequestBody() StaffDto staffDto) {
        // 공백, 탭, 개행문자 제거 전
        System.out.println("before staffDto = " + staffDto);
        // 공백, 탭, 개행문자 삭제
        staffDto.setId(staffDto.getId().trim());
        staffDto.setName(staffDto.getName().trim());
        staffDto.setPhone(staffDto.getPhone().trim());
        staffDto.setAddress1(staffDto.getAddress1().trim());
        staffDto.setStartDate(staffDto.getStartDate().trim());

        //유효성 검사 시작
        System.out.println("staffDto = " + staffDto);
        // 아이디 확인
        if(staffDto.getId().isEmpty()) {
            System.out.println("유효성 검사 : 아이디 미입력 오류");
            return false;
        }
        // 공백, 탭, 개행문자를 제거
        String id = staffDto.getId().replaceAll("\\s", "");
        System.out.println("id : " + id);
        if(!id.contains("hotels")) {
            System.out.println("유효성 검사 : 아이디 hotels 미입력 오류");
            return false;
        }
        String idNumber = id.substring(6);
        for(int index = 0; index < idNumber.length(); index++) {
            String number = idNumber.charAt(index) + "";
            // 정규식 숫자로 변환이 되면 true 안되면 false
            if(!number.matches("\\d")) {
                System.out.println("유효성 검사 : 아이디 정규식 오류");
                return false;
            }
        }
        // 이름 확인
        if(staffDto.getName().isEmpty()) {
            System.out.println("유효성 검사 : 이름 미입력 오류");
            return false;
        }
        // 전화번호 확인
        if(staffDto.getPhone().isEmpty()) {
            System.out.println("유효성 검사 : 전화번호 미입력 오류");
            return false;
        } else if(staffDto.getPhone().length() != 13) {
            System.out.println("유효성 검사 : 전화번호 입력 수 오류");
            return false;
        }
        String[] phone = staffDto.getPhone().split("-");
        System.out.println(Arrays.toString(phone));
        System.out.println(phone[0]);
        if(phone.length != 3) {
            System.out.println("유효성 검사 : 전화번호 입력 형식 오류");
            return false;
        } else if(!phone[0].equals("010")) {
            System.out.println("유효성 검사 : 전화번호 010 오류");
            return false;
        }
        for(int index = 1; index < phone.length; index++) {
            String slice = phone[index];
            int count = phone[index].length();
            if(count == 4) {
                for(int j = 0; j < count; j++) {
                    String number = slice.charAt(j) + "";
                    // 정규화 0~9의 숫자로 변환이 가능하면 true 불가능하면 false
                    if(!number.matches("\\d")) {
                        System.out.println("유효성 검사 : 전화번호 정규화 오류");
                        return false;
                    }
                }
            } else {
                System.out.println("유효성 검사 : 전화번호 오류");
                return false;
            }
        }
        // 주소 확인
        if(staffDto.getAddress1().isEmpty()) {
            System.out.println("유효성 검사 : 주소 미입력 오류");
            return false;
        }
        // 입사일 확인 --> 만약 직원 등록 시 입사일을 Input이 아닌 Date Picker로 받게 되면 할 필요가 없음
        // 연봉 확인
        if(staffDto.getSalary() == 0) {
            System.out.println("유효성 검사 : 연봉 미입력 오류");
            return false;
        }
        // 유효성 검사 끝
        boolean result = staffService.staffRegister(staffDto);
        return result;
    }

    /** 직원 전체 조회 */
    @GetMapping("")
    public ArrayList<StaffDto> staffFindAll() {
        ArrayList<StaffDto> result = staffService.staffFindAll();
        return result;
    }

    // 나중에 병합할때 작업
    /** 직원 지점별 조회 */
    @GetMapping("/detail")
    public ArrayList<StaffDto> staffFindDetail(@RequestParam(name = "hno") int hno) {
        ArrayList<StaffDto> result = staffService.staffFindDetail(hno);
        return result;
    }

    /** 직원 수정 */
    @PutMapping("")
    public boolean staffUpdate(StaffDto staffDto) {
        // 회원번호, 비밀번호, 이름, 전화번호, 주소, 입사일, 직급, 연봉, 근무지
        // 공백, 탭, 개행문자 제거 전
        System.out.println("before staffDto = " + staffDto);
        // 공백, 탭, 개행문자 제거
        staffDto.setPassword(staffDto.getPassword().trim());
        staffDto.setName(staffDto.getName().trim());
        staffDto.setPhone(staffDto.getPhone().trim());
        staffDto.setAddress1(staffDto.getAddress1().trim());
        staffDto.setStartDate(staffDto.getStartDate().trim());
        // 유효성 검사 시작
        System.out.println("staffDto = " + staffDto);
        // 직원 번호 확인
        if(staffDto.getStaffNumber() == 0) {
            System.out.println("유효성 검사 : 직원 번호 오류");
        }
        // 비밀번호 확인

        // 이름 확인
        if(staffDto.getName().isEmpty()) {
            System.out.println("유효성 검사 : 이름 미입력 오류");
            return false;
        }
        // 전화번호 확인
        if(staffDto.getPhone().isEmpty()) {
            System.out.println("유효성 검사 : 전화번호 미입력 오류");
            return false;
        } else if(staffDto.getPhone().length() != 13) {
            System.out.println("유효성 검사 : 전화번호 입력 수 오류");
            return false;
        }
        String[] phone = staffDto.getPhone().split("-");
        System.out.println(Arrays.toString(phone));
        System.out.println(phone[0]);
        if(phone.length != 3) {
            System.out.println("유효성 검사 : 전화번호 입력 형식 오류");
            return false;
        } else if(!phone[0].equals("010")) {
            System.out.println("유효성 검사 : 전화번호 010 오류");
            return false;
        }
        for(int index = 1; index < phone.length; index++) {
            String slice = phone[index];
            int count = phone[index].length();
            if(count == 4) {
                for(int j = 0; j < count; j++) {
                    String number = slice.charAt(j) + "";
                    // 정규화 0~9의 숫자로 변환이 가능하면 true 불가능하면 false
                    if(!number.matches("\\d")) {
                        System.out.println("유효성 검사 : 전화번호 정규화 오류");
                        return false;
                    }
                }
            } else {
                System.out.println("유효성 검사 : 전화번호 오류");
                return false;
            }
        }
        // 주소 확인
        if(staffDto.getAddress1().isEmpty()) {
            System.out.println("유효성 검사 : 주소 미입력 오류");
            return false;
        }
        // 입사일 확인 --> 만약 직원 등록 시 입사일을 Input이 아닌 Date Picker로 받게 되면 할 필요가 없음
        // 직급 --> 유효성 검사가 필요한지 확인 필요
        // 연봉 확인
        if(staffDto.getSalary() == 0) {
            System.out.println("유효성 검사 : 연봉 미입력 오류");
            return false;
        }
        // 근무지 --> 유효성 검사가 필요한지 확인 필요
        // 유효성 검사 끝
        boolean result = staffService.staffUpdate(staffDto);
        return result;
    }

    /** 직원 삭제(퇴직 처리) */
    @DeleteMapping("")
    public boolean staffDelete(@RequestParam(name = "staff_number") int staffNumber, @RequestParam(name = "end_date") String endDate) {
        // 공백, 탭, 개행문자 제거
        endDate = endDate.trim();
        // 유효성 검사 시작
        if(endDate.isEmpty()) {
            System.out.println("유효성 검사 : 옳지 않는 입력값");
            return false;
        }
        if(endDate.length() != 10) {
            System.out.println("유효성 검사 : 잘못된 형식의 입력값");
            return false;
        }
        String[] date = endDate.split("-");
        System.out.println(Arrays.toString(date));
        if(date.length != 3) {
            System.out.println("유효성 검사 : 잘못된 입력 형식 오류");
            return false;
        }
        for(int index = 0; index < date.length; index++) {
            String tempString = date[index];
            for(int j = 0; j < tempString.length(); j++) {
                String tempChar = tempString.charAt(j) + "";
                if(!tempChar.matches("\\d")) {
                    System.out.println("유효성 검사 : 숫자 변환 정규화 오류");
                    return false;
                }
            }
        }
        // 유효성 검사 끝
        boolean result = staffService.staffDelete(staffNumber, endDate);
        return result;
    }

}
