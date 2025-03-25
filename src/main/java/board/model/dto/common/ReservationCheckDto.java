package board.model.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReservationCheckDto {

    // 객실 번호
    private int rono;
    // 체크인
    private String resstart;
    // 체크아웃
    private String resend;

} // c end
