import Chart from "react-google-charts";
import React, {useState, useEffect } from "react";
import { getStatistics } from "../../services/serviceService";

const StatisticsForm = () => {
    const [statistics, setStatistics] = useState();
    useEffect(() => {
        async function fetchAPI() {
          const { data } = await getStatistics();
          
        //   const rateCurrencyNames = Object.keys(data)
        //   const rateCurrencyValues = Object.values(data)
        //   const chartData = [['Currency Name', 'Currency Rate']]
        //   for (let i = 0; i < rateCurrencyNames.length; i += 1) {
        //     chartData.push([rateCurrencyNames[i], rateCurrencyValues[i]])
        //   }
        let values=[['Task', 'Hours per Day']];
        for (const key in data) {
            values.push([data[key].Label, data[key].count] );
        }  


          setStatistics (values);
        }
        fetchAPI();
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
    <div >
{statistics && <Chart
        width={'450px'}
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
      );
}
 
export default StatisticsForm;