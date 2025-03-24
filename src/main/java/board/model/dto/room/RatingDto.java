package board.model.dto.room;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {

    // 객실등급번호
    private int rno;
    // 객실등급
    private String ratingName;
    // 침대수
    private int bedCount;
    // 침대유형
    private String bedType;
    // 가격
    private int price;

} // c end
