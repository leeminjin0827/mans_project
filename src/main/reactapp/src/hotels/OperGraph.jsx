
import { BarChart } from '@mui/x-charts/BarChart';
import '../index.css'
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function Choice(props){
  useEffect(()=>{choice(props.hno)},[])

  console.log("props확인" + props.hno);
    useEffect(()=>{choice(props.hno)},[props.hno]) // useEffect 의존성 배열 추가 (props.hno 변경 시 effect 재실행)

    console.log("props확인" + props.hno);
    const [choiceGraph , setChoiceGraph] = useState();
    const [loading, setLoading] = useState(true);
    const backendHno = props.hno - 1;
    console.log(backendHno);
    const choice = async (hno) => { // 인자 이름 통일 (props.hno 사용)
        try{
            const response = await axios.get(`http://localhost:8081/detail/choice?hno=${hno}`);
            console.log(`Data for hno ${hno}:`, response.data);
            setChoiceGraph(response.data);
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }
    console.log(loading);
    console.log(choiceGraph);


    if (loading) {
        return <div>데이터를 불러오는 중...</div>;
    }

    // choiceGraph가 아직 로딩되지 않았을 경우를 대비하여 조건부 렌더링 추가
    if (!choiceGraph) {
        return <div>표시할 데이터가 없습니다.</div>;
    }


    return(<>

    <BarChart sx={{  ml: -30 } }
                xAxis={[{ scaleType: 'band', data: ['지점매출'] ,categoryGapRatio : 0.8 }]}
                series={[{ data: [choiceGraph?.total_Payment || 0], label : '각 지점별 총 결제 금액'}]} // total_Payment 값을 배열로 감싸서 전달
                width={250}
                height={300}
                />

    </>)
}