package board.model.dto.room;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    // 등록시 업로드된 파일의 인터페이스 (여러개)
    private List<MultipartFile> ruploadfiles;

    private String name;
    private int staffNumber; // staff_number
    private String ratingName; // rating_name
    private int bedCount; // bed_count
    private String bedType; // bed_type
    private String opName; // op_name

} // c end
