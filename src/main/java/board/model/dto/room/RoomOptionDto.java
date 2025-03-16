package board.model.dto.room;

import lombok.*;

@Setter @Getter @ToString @Builder
@NoArgsConstructor @AllArgsConstructor
public class RoomOptionDto {
    // 객실 번호 (FK)
    private int rno;
    // 옵션 번호 (FK)
    private int opno;
    private String ratingName; // rating_name
    private int bedCount;
    private String bedType;
    private String opName; // op_name
} // c end
