import { Button } from "@mui/material";
import '../index.css';
import UserWrite from "./components/user/UserWrite";
import { useState } from "react";
import UserView from "./components/user/UserView";
import axios from "axios";
import Senter from "./Senter";
import SenterWrite from "./components/senter/SenterWrite";
import SenterView from "./components/senter/SenterView";

export default function User( props ){

    const [selectSno, setSelectSno] = useState(null);

    // ========================================= 예약 내역 조회 ========================================= //
    
    const [reservationView , setReservationView ] = useState([]);
    console.log( "예약내역" );
    console.log( reservationView );

    const reservationUserView = async () => {
        const resname = prompt("이름을 입력하세요.");
        const resphone = prompt("전화번호를 입력하세요.");
        if( !resname || !resphone ){ return }
        try{
            const response = await axios.get(`http://localhost:8081/reservation/view?resname=${resname}&resphone=${resphone}`);
            if( response.data.length > 0 ){ // 예약내역이 0보다 많으면 (있으면)
                alert("확인됐습니다.");
                setReservationView(response.data);
                setChangePage("2"); // 예약 내역이 있으면 페이지상태에 2부여(switch case:2 실행)
            }else{
                alert("예약내역이 없습니다.");
            }
        }catch( e ) { console.log( e ); }
    }

    // ========================================= 페이지 전환 ========================================= //
    // 페이지 상태
    const [changePage , setChangePage] = useState("menu");
    // logo클릭시 처음화면
    const logoClick = () => {
        setChangePage("4");
    } // f end

    const contentBox = () => {
        switch (changePage) {
            case "1":
                return <UserWrite />
            case "2":
                return <UserView reservationView={reservationView} />
            case "3":
                return <Senter setChangePage={setChangePage} setSelectSno={setSelectSno} />
            case "4":
                return(<>
                    <Button onClick={ () => setChangePage("1")} className="user_btn" type="button">호텔예약</Button>
                    <Button onClick={reservationUserView} className="user_btn" type="button">예약조회</Button>
                    <Button onClick={ () => setChangePage("3")} className="user_btn" type="button">문의</Button>
                </>)
            case "5":
                return(<>
                    <SenterWrite setChangePage = { setChangePage } />
                </>)
            case "6":
                return(<>
                    <SenterView setChangePage = { setChangePage } setSelectSno = { setSelectSno } />
                </>)
            default:
                return(<>
                    <Button onClick={ () => setChangePage("1")} className="user_btn" type="button">호텔예약</Button>
                    <Button onClick={reservationUserView} className="user_btn" type="button">예약조회</Button>
                    <Button onClick={ () => setChangePage("3")} className="user_btn" type="button">문의</Button>
                </>)
        }
    } // f end

    return(<>
        <div id="user_body">
            <header id="user_header">
                <button className="logo_btn" type="button" onClick={logoClick} >
                    <img src="/logo2.png" />
                </button>
            </header>
            <div id="user_function">
                <div className="button_box">
                    {contentBox()}
                </div>
            </div>
            <footer id="user_footer">
                <div>
                    <img src="/logo2.png" />
                </div>
            </footer>
        </div>
    </>)
} // c end