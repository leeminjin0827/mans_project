package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomMapper {

    // 객실 등록 SQL // 회원 번호 , 담당자 추가 해야함
    @Insert(" insert into room(rno) values ( #{rno} ) ")
    boolean roomWrite(RoomDto roomDto);

    // 객실 전체조회 SQL
    @Select(" select r.rono, r.rno, rt.rating_name, rt.bed_count, rt.bed_type, o.op_name from room r " +
            "join rating rt on r.rno = rt.rno " +
            "join room_options ro on r.rno = ro.rno " +
            "join options o on ro.opno = o.opno " +
            "order by r.rono ASC")
    @Results({
            @Result(property = "rono", column = "rono"),
            @Result(property = "rno", column = "rno"),
            @Result(property = "ratingName", column = "rating_name"),
            @Result(property = "bedCount", column = "bed_count"),
            @Result(property = "bedType", column = "bed_type"),
            @Result(property = "opName", column = "op_name")
    })
    List<RoomDto> roomList();

    // 객실 수정 SQL // 회원 번호 , 담당자 추가 해야함
    @Update(" update room set rno = #{rno} where rono = #{rono} ")
    boolean roomUpdate(RoomDto roomDto);

    // 객실 삭제 SQL
    @Delete(" delete from room where rono = #{rono} ")
    boolean roomDelete(int rono);

} // i end
