package board.model.mapper;

import board.model.dto.ReserVationDetailDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


import java.util.List;

@Mapper
public interface ReserVationDetailMapper {

    @Select("select rvno, price, payment_date, detail_state, reno from reservationdetail")
    public List<ReserVationDetailDto> detailFin();


}
