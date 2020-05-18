
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllColleges } from '../firebase/FirestoreFunctions'


function Charts() {

    const [chartData, setChartData] = useState();


    useEffect(() => {
        async function getData() {
            try {
                let clist = await getAllColleges();

                let collegeNames = [];
                let collegeAvgs = [];
                clist.map(async (item) => {
                    collegeNames.push(item.name);
                    if (item.sum && item.count > 0) {

                        collegeAvgs.push(parseInt(item.sum) / parseInt(item.count))
                    } else collegeAvgs.push(0)

                })

                console.log(collegeNames);
                console.log(collegeAvgs)


                let x = {
                    labels: collegeNames,
                    datasets: [
                        {   fill:false,
                            borderWidth:1,
                            borderColor: 'rgba(0,0,0,1)',
                        lineTension: 0.5,

                            label: 'Averages',
                            data: collegeAvgs,
                        
                            backgroundColor: [
                '#00b894',
                '#00cec9',
                '#0984e3',
                '#fdcb6e',
                '#e17055',
                '#4a69bd',
                '#44bd32',
                '#341f97',
                '#B53471',
                '#2C3A47',
                '#ef5777',
                '#fa8072',
                '#eee8aa',
                '#6495ed',
                '#ff1493'

                            ]
            }
                    ]
        }
        setChartData(x);

    } catch (e) {
        console.log(e)
    }
}
getData();
    }, [])


return (

    <div className=" container container1 chart">
        <div className="container container1">
                <h1>What are our Insights?</h1>
                <br></br>
                <div className="devName post">
                Every year  when it comes to living expenses and resources , the figures are always an average assumption of numbers rather than actual data. Here is where our Insights comes into play!
                <br></br><br></br>
                Our application is designed to give incoming students the realtime data from students that have actually studied in these universities. The monthly expenses including rent and utilities are displayed in the insights for every university.
                <br></br>
                </div>
            </div>

            {chartData ? (
        <Bar
        data={chartData}
        options={{
            title: {
                display: true,

                text: 'Average Expenses of Universities($)',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'right'
            }
        }}
    />
    ) : (
        <p>Not enough data to display a graph </p>
    )}
    </div>
)

}

export default Charts;