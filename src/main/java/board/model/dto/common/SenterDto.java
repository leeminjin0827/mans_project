package board.model.dto.common;

import lombok.*;

@Setter @Getter @ToString @Builder
@AllArgsConstructor @NoArgsConstructor
public class SenterDto {
    // 문의번호 PK
    private int sno;
    // 문의 작성자
    private String senterName;
    // 문의 작성자 전화번호
    private String senterPhone;
    // 문의제목
    private String senterTitle;
    // 문의내용
    private String senterContent;

} // c end
