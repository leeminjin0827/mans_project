package board.model.dto;

import lombok.*;

@Getter@Setter@ToString
@AllArgsConstructor@NoArgsConstructor@Builder
public class ReserVationDetailDto {

    private int rvno;
    private int price;
    private String payment_date;
    private String detail_state;
    private int reno;

}
