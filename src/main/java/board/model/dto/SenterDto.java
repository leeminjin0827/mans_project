package board.model.dto;

import lombok.*;

@Setter @Getter @ToString @Builder
@AllArgsConstructor @NoArgsConstructor
public class SenterDto {
    // 문의번호
    private int sno;
    // 문의제목
    private String stitle;
    // 문의내용
    private String scontent;
    // 문의비밀번호
    private int spassword;
    // 문의작성자
    private String suser;

} // c end
