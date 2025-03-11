package board.model.dto.room;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OptionDto {

    // 옵션식별번호
    private int opno;
    // 옵션명
    private String opName;

} // c end
