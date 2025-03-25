

import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Graph(props){
    useEffect(()=>{Datas},[])

    const [detailData, setDetailData] = useState();

    const Datas = async ()=>{
      try{
        const response = await axios.get('http://localhost:8081/detail');
        console.log(response.data);
        setDetailData(response.data);
        console.log(response.data);

      }catch(error){console.log(error);}
    }
    console.log(detailData);



    return(<>
         <BarChart
      xAxis={[{ scaleType: 'band', data: ['1월달', '2월달', '3월달'] }]}
      
      series={[
        {
            data: [3100, 5000, 3000], // 각 xAxis 항목에 대응하는 값 (순서대로 강남점, 중구점, 인천점)
            label: '총매출',
        },
      ]}
      width={1500}
      height={400}
      yAxis={[{ tickInterval : 1000,}]}/>
    
    
        </>)

}