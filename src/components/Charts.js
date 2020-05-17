
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getAllPostsforCollege, getAllColleges } from '../firebase/FirestoreFunctions'
import { cpus } from 'os';


function Charts() {

    const [collegeList, setCollegeList] = useState();
    const [utilities, setUtilities] = useState();
    const [rent, setRent] = useState();
    const [total, setTotal] = useState();

    const [chartData, setChartData] = useState();
    const [displayTitle, setDisplayTitle] = useState(true);
    const [displayLegend, setDisplayLegend] = useState(true);
    const [legendPosition, setLegendPosition] = useState('right');
    const [location, setLocation] = useState('City');


    useEffect(() => {
        async function getData() {
            try {
                console.log("Entering use effect at home")
                let clist = await getAllColleges();
                setCollegeList(clist);

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
        {/* <Pie
            data={chartData}
            options={{
                title: {
                    display: displayTitle,
                    text: 'Heighest Average Expenses ' + location,
                    fontSize: 25
                },
                legend: {
                    display: displayLegend,
                    position: legendPosition
                }
            }}
        /> */}

        <Bar
            data={chartData}
            options={{
                title: {
                    display: displayTitle,
                    text: 'Average Expenses of colleges' + location,
                    fontSize: 25
                },
                legend: {
                    display: displayLegend,
                    position: legendPosition
                }
            }}
        />

        {/* <Line
            data={chartData}
            
            options={{
                fill:false,
                title: {
                    display: displayTitle,
                    text: 'Largest Cities In ' + location,
                    fontSize: 25
                },
                legend: {
                    display: displayLegend,
                    position: legendPosition
                }
            }}
        /> */}
    </div>
)

}

export default Charts;