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
    // 호텔번호
    private int hno;
    // 객실 사진
    private String rimg;
    private String name;
    private int staffNumber; // staff_number
    private String ratingName; // rating_name
    private int bedCount; // bed_count
    private String bedType; // bed_type
    private String opName; // op_name

} // c end
