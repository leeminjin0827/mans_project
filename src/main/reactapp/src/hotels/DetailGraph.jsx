

import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../index.css'
import Sidebar from "./components/Sidebar";






export default function Graph(props){
    useEffect(()=>{Datas()},[])

    const [detailData, setDetailData] = useState();
    const [loading, setLoading] = useState(true);

    const Datas = async ()=>{
      try{
        const response = await axios.get('http://localhost:8081/detail');
        console.log(response.data);
        setDetailData(response.data);
        setLoading(false);
        console.log(response.data);

      }catch(error){console.log(error);
        setLoading(false); 
      }
    }
    console.log(detailData);


    if (loading) {
      return <div>데이터를 불러오는 중...</div>;
    }
  
    if (!detailData || detailData.length === 0) {
      return <div>표시할 데이터가 없습니다.</div>;
    }

  
    const xAxisData = ['1월달', '2월달', '3월달' ,'4월달','5월달','6월달' , '7월달','8월달','9월달','10월달','11월달','12월달'];
    const monthlySales = xAxisData.map(month => {
      const yearMonth = `2025-${month.split('월')[0].padStart(2, '0')}`;
      const found = detailData.find(item => item.fullprice === yearMonth); 
      return found ? found.monthprice : 0;
    });
    console.log(monthlySales)

    return(<> 
      <Sidebar />  
         <BarChart 
              xAxis={[{ scaleType: 'band',  data: xAxisData , categoryGapRatio: 0.5}]}
              

          
          series={[
            {
                data: monthlySales, // 각 xAxis 항목에 대응하는 값 (순서대로 강남점, 중구점, 인천점)
                label: '총매출'
              
            },
          ]}
          width={1350}
          height={400}
          >
          
          </BarChart>
        </>)

}