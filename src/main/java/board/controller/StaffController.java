package board.controller;

import board.model.dto.StaffDto;
import board.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/staff")
@CrossOrigin("http://localhost:5174")
public class StaffController {

    private final StaffService staffService;
    @Autowired
    public StaffController(StaffService staffService) {this.staffService = staffService;}

    /** 직원 등록 */
    @PostMapping("")
    public boolean staffRegister(@RequestBody() StaffDto staffDto) {
        boolean result = staffService.staffRegister(staffDto);
        return result;
    }

    /** 직원 전체 조회 */
    @GetMapping("")
    public ArrayList<StaffDto> staffFindAll() {
        ArrayList<StaffDto> result = staffService.staffFindAll();
        return result;
    }

    // 나중에 병합할때 작업
    /** 직원 지점별 조회 */
    @GetMapping("/detail")
    public ArrayList<StaffDto> staffFindDetail() {
        ArrayList<StaffDto> result = staffService.staffFindDetail();
        return result;
    }

    /** 직원 수정 */
    @PutMapping("")
    public boolean staffUpdate(@RequestBody() StaffDto staffDto) {
        boolean result = staffService.staffUpdate(staffDto);
        return result;
    }

    /** 직원 삭제(퇴직 처리) */
    @DeleteMapping("")
    public boolean staffDelete(@RequestParam(name = "staff_number") int staffNumber, @RequestParam(name = "end_date") String endDate) {
        boolean result = staffService.staffDelete(staffNumber, endDate);
        return result;
    }

}
