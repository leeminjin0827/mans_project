package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomMapper {

    // 객실 등록 SQL
    @Insert(" insert into room(rno,hno,staff_number,rimg) values ( #{rno} , #{hno} , #{staffNumber} , #{rimg} ) ")
    boolean roomWrite(RoomDto roomDto);

    // 객실 전체조회 SQL
    @Select(" select r.rono, r.rno, r.hno, r.staff_number, rt.rating_name, rt.bed_count, rt.bed_type, sno.name, o.op_name from room r " +
            "join rating rt on r.rno = rt.rno " +
            "join operate ope on r.hno = ope.hno " +
            "join staff sno on r.staff_number = sno.staff_number " +
            "join room_options ro on r.rno = ro.rno " +
            "join options o on ro.opno = o.opno " +
            "order by r.rono ASC")
    @Results({
            @Result(property = "rono", column = "rono"),
            @Result(property = "rno", column = "rno"),
            @Result(property = "hno", column = "hno"),
            @Result(property = "staffNumber", column = "staff_number"),
            @Result(property = "ratingName", column = "rating_name"),
            @Result(property = "bedCount", column = "bed_count"),
            @Result(property = "bedType", column = "bed_type"),
            @Result(property = "opName", column = "op_name")
    })
    List<RoomDto> roomList();

    // 객실 수정 SQL
    @Update(" update room set rno = #{rno} , staff_number = #{staffNumber} where rono = #{rono} ")
    boolean roomUpdate(RoomDto roomDto);

    // 객실 삭제 SQL
    @Delete(" delete from room where rono = #{rono} ")
    boolean roomDelete(int rono);

} // i end
