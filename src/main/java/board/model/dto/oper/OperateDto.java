package board.model.dto.oper;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter@Setter@ToString
@AllArgsConstructor@NoArgsConstructor
public class OperateDto {

    private int hno;
    private String hname;
    private String address;
    private  String hotel_number;
    private String intro;
    private int state;
    private String mimg;

    private MultipartFile uploadfile;




}
