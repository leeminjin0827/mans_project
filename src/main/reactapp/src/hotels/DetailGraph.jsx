

import { BarChart } from '@mui/x-charts/BarChart';


export default function Graph(props){
    const amountToAdd = 0; // 더하고 싶은 값



    return(<>
         <BarChart
      xAxis={[{ scaleType: 'band', data: ['강남점', 'group B', 'group C'] }]}
      
      series={[
        {
            data: [3100, 5000, 3000], // 각 xAxis 항목에 대응하는 값 (순서대로 강남점, group B, group C)
            label: '총매출', // 필요하다면 시리즈 라벨을 추가할 수 있습니다.
        },
      ]}
      width={400}
      height={400}
      yAxis={[{
        
        tickInterval : 1000,
         
      }]}
    />
    
    
            </>)

}