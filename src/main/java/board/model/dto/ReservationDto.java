package board.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    // 예약번호 PK
    private int reno;
    // 예약자 이름
    private String resname;
    // 예약자 전화번호
    private String resphone;
    // 입실날짜
    private String resstart;
    // 퇴실날짜
    private String resend;
    // 객실번호
    private int rono;
    // 객실이름(호실)
    private String rname;
} // c end
