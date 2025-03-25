package board.model.mapper.common;

import board.model.dto.common.ReserVationDetailDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


import java.util.List;

@Mapper
public interface ReserVationDetailMapper {

    @Select("select date_format(payment_date, '%Y-%m') as FULLPRICE, SUM(price) AS monthprice from reservationdetail group by FULLPRICE order by FULLPRICE;")
    public List<ReserVationDetailDto> detailFin();


}
