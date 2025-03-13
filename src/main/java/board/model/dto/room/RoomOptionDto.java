package board.model.dto.room;

import lombok.*;

@Setter @Getter @ToString @Builder
@NoArgsConstructor @AllArgsConstructor
public class RoomOptionDto {
    // 객실 번호 (FK)
    private int rono;
    // 옵션 번호 (FK)
    private int opno;
} // c end
