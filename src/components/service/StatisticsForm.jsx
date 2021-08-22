import Chart from "react-google-charts";
import React, {useState, useEffect } from "react";
import { getStatistics } from "../../services/serviceService";

const StatisticsForm = () => {
    const [statistics, setStatistics] = useState();
    const [statisticsbrand, setStatisticsbrand] = useState();
    
    useEffect(() => {
        async function fetchAPI() {
          const { data } = await getStatistics();
             
        let values=[['Task', 'Hours per Day']];
        const {statistic,statisticbrand}=data
        for (const key in statistic) {
            values.push([statistic[key].Label, statistic[key].count] );
        }  
        
        let valuesbrand=[['Brand', 'Recently']];
        for (const key in statisticbrand) {
          valuesbrand.push([statisticbrand[key].Label, statisticbrand[key].count] );
        } 

          setStatistics (values);
          setStatisticsbrand (valuesbrand);
          
        }
        let interval = setInterval(() => {
          fetchAPI();
          clearInterval(interval);
          interval = setInterval(fetchAPI, 60000);
        }, 3000);
       
        
      }, []);
    
    //   {[
    //     ['Task', 'Hours per Day'],
    //     ['Work', 11],
    //     ['Eat', 2],
    //     ['Commute', 2],
    //     ['Watch TV', 2],
    //     ['Sleep', 7],
    //   ]}

    return (
    <div className="col-12">
    <div className="col-md-6  d-md-inline-block">
{statistics && <Chart
        width={'100%'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={statistics}
        options={{
          title: 'Type Of Service Statistics',
          // Just add this option
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />}
      </div>  
      <div className="col-md-6  d-md-inline-block">
       {statisticsbrand && <Chart
        width={'100%'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={statisticsbrand}
        options={{
          title: 'Type Of Brands Statistics',
          // Just add this option
          is3D: true,
        }}
        rootProps={{ 'data-testid': '2' }}
      />}
      </div>  
    </div>
      );
}
 
export default StatisticsForm;