package board.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class StaffDto {
    // 직원 번호
    private int staffNumber;
    // 직원 아이디
    private String id;
    // 직원 비밀번호
    private String password;
    // 직원 이름
    private String name;
    // 직원 전화번호
    private String phone;
    // 직원 주소
    private String address;
    // 직원 입사일
    private String startDate;
    // 직원 퇴사일
    private String endDate;
    // 직원 직급
    private int staffRank;
    // 직원 연봉
    private int salary;
    // 직원 퇴사 상태
    private int resignation;
    // 직원 근무지
    private int hno;
    // 직원 사진
    private String myPhoto;
    // 직원 사진 바이너리 파일
    private MultipartFile uploadFile;

}
