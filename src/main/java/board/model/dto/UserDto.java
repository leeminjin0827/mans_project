package board.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class UserDto {
    // 사용자 번호
    private int userNumber;
    // 사용자 아이디
    private String id;
    // 사용자 비밀번호
    private String password;
    // 사용자 이름
    private String name;
    // 사용자 전화번호
    private String phone;
    // 사용자 주소
    private String address;
    // 관리자 상태 0이면 일반 사용자, 1이면 관리자
    private int adminState;
    // 가입 날짜
    private String joinDate;
    // 회원탈퇴 상태 0이면 탈퇴 1이면 미탈퇴
    private int dropState;
}
