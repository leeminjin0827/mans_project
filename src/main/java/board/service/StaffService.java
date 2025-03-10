package board.service;

import board.model.dto.StaffDto;
import board.model.mapper.StaffMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;

@Service
public class StaffService {

    private final StaffMapper staffMapper;
    @Autowired
    public StaffService(StaffMapper staffMapper) {this.staffMapper = staffMapper;}

    /** 직원 등록 */
    public boolean staffRegister(StaffDto staffDto) {
        // 유효성 검사 시작
        // 유효성 검사 종료
        boolean result = staffMapper.staffRegister(staffDto);
        return result;
    }

    /** 직원 전체 조회 */
    public ArrayList<StaffDto> staffFindAll() {
        // 유효성 검사 시작
        // 유효성 검사 종료
        ArrayList<StaffDto> result = staffMapper.staffFindAll();
        return result;
    }

    /** 직원 지점별 조회 */
    public ArrayList<StaffDto> staffFindDetail(int hno) {
        // 유효성 검사 시작
        // 유효성 검사 종료
        ArrayList<StaffDto> result = staffMapper.staffFindDetail(hno);
        return result;
    }

    /** 직원 수정 */
    public boolean staffUpdate(StaffDto staffDto) {
        // 유효성 검사 시작
        // 유효성 검사 종료
        boolean result = staffMapper.staffUpdate(staffDto);
        return result;
    }

    /** 직원 삭제 */
    public boolean staffDelete(int staffNumber, String endDate) {
        // 유효성 검사 시작
        // 유효성 검사 종료
        boolean result = staffMapper.staffDelete(staffNumber, endDate);
        return result;
    }

}
