
import { BarChart } from '@mui/x-charts/BarChart';
import '../index.css'
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function Choice(props){
    const [localHno, setLocalHno] = useState(props.hno);
    useEffect(()=>{choice(props.hno)}, [props.hno])
    // console.log(props.hno);
 

    const [choiceGraph , setChoiceGraph] = useState();
    const [loading, setLoading] = useState(true);
  

    const choice = async (hno) => {
        try{
            const response = await axios.get(`http://localhost:8081/detail/choice?hno=${hno}`);
            console.log(response.data);
            setChoiceGraph(response.data);
            setLoading(false);

        }catch(error){console.log(error);  setLoading(false);}
    
    }
    console.log(choiceGraph);

    if (loading) {
        return <div>데이터를 불러오는 중...</div>;
      }
    
      if (!choiceGraph || choiceGraph.length === 0) {
        return <div>표시할 데이터가 없습니다.</div>;
      }


    return(<>
    
    <BarChart sx={{  ml: -30}}
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={730}
                height={300}
                />

    
    </>)
}