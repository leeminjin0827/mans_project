package board.model.dto.room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PictureDto {

    // 사진 번호(PK)
    private int pno;
    // 파일명
    private String pnoname;
    // 객실번호(FK)
    private int rono;

} // c end
