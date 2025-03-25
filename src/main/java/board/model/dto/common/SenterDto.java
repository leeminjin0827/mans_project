package board.model.dto.common;

import lombok.*;

@Setter @Getter @ToString @Builder
@AllArgsConstructor @NoArgsConstructor
public class SenterDto {
    // 문의번호 PK
    private int sno;
    // 문의제목
    private String stitle;
    // 문의내용
    private String scontent;
    // 문의작성자 FK
    private int userNumber;

} // c end
