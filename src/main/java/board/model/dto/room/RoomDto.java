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
    private String ratingName; // rating_name
    private int bedCount;
    private String bedType;
    private String opName; // op_name

} // c end
