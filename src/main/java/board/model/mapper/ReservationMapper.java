package board.model.mapper;

import board.model.dto.ReservationDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReservationMapper {

    /** 객실 예약 내역 전체 조회 */
    @Select("select * from reservation")
    List<ReservationDto> reservationFindAll();


}
