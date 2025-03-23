package board.model.mapper;

import board.model.dto.OperateDto;
import board.model.dto.ReservationDto;
import board.model.dto.room.RoomDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.sql.Date;
import java.util.List;

@Mapper
public interface ReservationMapper {

    /** 지점별 예약 내역 조회 */
    @Select("select re.*, ro.* from reservation as re " +
            "inner join room as ro " +
            "on re.rono = ro.rono " +
            "where hno = #{hno} and resstart = #{date};")
    List<ReservationDto> reservationFind(@Param("hno") int hno, @Param("date") String date);

    /** 지점별 객실 조회 */
    @Select("select * from room where hno = #{hno}")
    List<RoomDto> findHnoRoom(@Param("hno") int hno);

    /** 지점 번호 조회 */
    @Select("select hno from operate where state = #{state}")
    List<OperateDto> findHno(@Param("state") int state);

}
