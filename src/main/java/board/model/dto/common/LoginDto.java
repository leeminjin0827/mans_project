package board.model.dto.common;

import lombok.*;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class LoginDto {
    // 직원 번호
    private int StaffNumber;
    // 직원 아이디
    private String id;
    // 직원 비밀번호
    private String password;
    // 퇴사 상태
    private int resignation;
}
