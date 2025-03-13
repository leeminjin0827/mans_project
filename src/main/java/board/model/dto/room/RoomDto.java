package board.model.dto.room;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {

    // 객실번호 PK
    private int rono;
    // 객실등급번호 FK
    private int rno;
//    // 옵션번호 FK
//    private int opno;
} // c end
