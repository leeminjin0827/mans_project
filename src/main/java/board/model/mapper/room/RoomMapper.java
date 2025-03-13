package board.model.mapper.room;

import board.model.dto.room.OptionDto;
import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface RoomMapper {

    // 객실 등록 SQL
    @Insert(" insert into room(rno) values ( #{rno} ) ")
    boolean roomWrite(RoomDto roomDto);  // 자동 생성된 rono를 외부에서 처리

    // 객실에 옵션 추가 SQL
    @Insert(" insert into room_options(rono, opno) values ( #{rono}, #{opno} ) ")
    boolean roomOptionWrite(@Param("rono") int rono, @Param("opno") int opno);

    // 객실 전체조회 SQL
    @Select(" select r.rono, r.rno, rt.rating_name, o.op_name from room r " +
            "join rating rt on r.rno = rt.rno " +
            "join room_options ro on r.rono = ro.rono " +
            "join options o on ro.opno = o.opno")
    List<RoomDto> roomList();

    // 객실 수정 SQL
    @Update(" update room set rno = #{rno} where rono = #{rono} ")
    boolean roomUpdate(RoomDto roomDto);

    // 객실에 옵션 삭제 SQL
    @Delete(" delete from room_options where rono = #{rono} ")
    boolean roomOptionsDelete(int rono);

    // 객실 삭제 SQL
    @Delete(" delete from room where rono = #{rono} ")
    boolean roomDelete(int rono);

    // 방 번호 조회 (방 등록 후 번호를 가져오기 위해 추가)
    @Select(" select last_insert_id() ")
    int getLastInsertedRno();
}
