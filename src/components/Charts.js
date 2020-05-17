
import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getAllPostsforCollege, getAllColleges } from '../firebase/FirestoreFunctions'
import { cpus } from 'os';


function Charts() {

    const [collegeList, setCollegeList] = useState();
    const [utilities, setUtilities] = useState();
    const [rent, setRent] = useState();
    const [total, setTotal] = useState();

<<<<<<< HEAD
    const [chartInstance, setChartInstance] = useState(null);
    const chartContainer = useRef(null);
    const [change, setChange] = useState(false);
    const [chartChange, setChartChange] = useState(
        {
            type: 'bar',
            data : {
                // labels : utilityLabel,
                // labels: [...Object.keys(utilityList)],
                datasets : [{
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    data: null
                    // data : utilityDatapoints
                }]
                // data : utilityValue
                // data : utilityDatapoints
            }
            // data : utilityDatapoints
        }
    );
=======
    const [chartData, setChartData] = useState();
    const [displayTitle, setDisplayTitle] = useState(true);
    const [displayLegend, setDisplayLegend] = useState(true);
    const [legendPosition, setLegendPosition] = useState('right');
    const [location, setLocation] = useState('City');
>>>>>>> c4c97771b5ca07f173b18ebf593264a90983289c


<<<<<<< HEAD

    // let config = (ulab=null, uval=null) => {
    //     // let canvas = document.getElementById("utilityChart").getContext("2d");
    //     console.log('uval', uval)
    //     // let utilityLabel = [];
    //     // clist.map((item) => {
    //     //     utilityLabel.push(item.name)
    //     //     utilityValue.push(uList[item.name])
    //     // });

    //     let chartConfig = {
    //     type: 'bar',
    //     data : {
    //         // labels : utilityLabel,
    //         // labels: [...Object.keys(utilityList)],
    //         datasets : [{
    //             barPercentage: 0.5,
    //             barThickness: 6,
    //             maxBarThickness: 8,
    //             minBarLength: 2,
    //             data: uval
    //             // data : utilityDatapoints
    //         }]
    //         // data : utilityValue
    //         // data : utilityDatapoints
    //     }
    //     // data : utilityDatapoints
    // };

    
    // // let newChartInstance = new Chartjs(chartContainer.current, chartConfig)

    // // let newChartInstance = new Chartjs(canvas, chartConfig)
    // // setChartInstance(newChartInstance)
    // return chartConfig
    // }

    
    useEffect(() => {
        let utilityLabel = [];
        let utilityValue = [];
        let utilityDatapoints=[];

=======
    useEffect(() => {
>>>>>>> c4c97771b5ca07f173b18ebf593264a90983289c
        async function getData() {
            try {
                console.log("Entering use effect at home")
                let clist = await getAllColleges();
                setCollegeList(clist);
<<<<<<< HEAD
                console.log("fetched all colleges from db", clist);


                let rentList = {};
                let utilityList = {};
                let totalList = {};

                
                // let utilityDatapoints=[];
                // let utilityLabel = [];
                // let utilityValue = [];
=======
>>>>>>> c4c97771b5ca07f173b18ebf593264a90983289c

                let collegeNames = [];
                let collegeAvgs = [];
                clist.map(async (item) => {
<<<<<<< HEAD

                        const p = await getAllPostsforCollege(item.id);
                        console.log("All post for college is",p)
                        //sort the posts
                        let sortedPosts;
                        if(p){
                        sortedPosts = p.sort((a, b) => b.createdAt - a.createdAt)
                        } else {
                            sortedPosts=p;
                        } 

                        let count = 0;
                        let sumRent = 0 ;
                        let sumUtilities = 0
                        let sumTotal = 0
                        if (sortedPosts) {
                            sortedPosts.map((item) => {
                                    sumTotal = sumTotal + parseInt(item.rent) + parseInt(item.utilities)
                                    sumUtilities = sumUtilities + parseInt(item.utilities)
                                    sumRent = sumRent + parseInt(item.rent)
                                    count += 1 
                            })
                            rentList[item.name]= sumRent/count
                            
                            utilityList[item.name]= sumUtilities/count
                            utilityLabel.push(item.name)
                            utilityValue.push(utilityList[item.name])
                            utilityDatapoints.push({x:item.name, y:utilityList[item.name]})

                            totalList[item.name]= sumTotal/count
                    }
                    else{
                        utilityLabel.push(item.name)
                        utilityValue.push(0)
                        utilityDatapoints.push({x: item.name, y: 0})
                    }
                }
                );


                    // let chartConfig = config(utilityLabel, utilityValue);

                    
                    let chartConfig = {
                        type: 'bar',
                        data : {
                            // labels : utilityLabel,
                            // labels: [...Object.keys(utilityList)],
                            datasets : [{
                                barPercentage: 0.5,
                                barThickness: 6,
                                maxBarThickness: 8,
                                minBarLength: 2,
                                // data: utilityValue
                                data : utilityDatapoints
                            }]
                            // data : utilityValue
                            // data : utilityDatapoints
                        }
                        // data : utilityDatapoints
                    };
                    
                    setChartChange(chartConfig);

                    // let canvas = document.getElementById("utilityChart").getContext("2d");
                    // console.log("ulist",utilityList)
                    // let utilityDatapoints=[];
                    // clist.map((item) => {    
                    //     utilityDatapoints.push({x:item.name, y:(utilityList[item.name] ? utilityList[item.name]!=null : 0) })
                    // })
                    // console.log("datapoints",utilityDatapoints)
                    // let utilityLabel = [];
                    // let utilityValue = [];
                    // clist.map((item) => {
                    //         let f=false
                    //         Object.keys(utilityList).forEach((key) => {
                    //             console.log('first here')
                    //             if(item.name==key[0]){
                    //                 console.log('here')
                    //                 utilityValue.push(utilityList[key])
                    //                 f=true;
                    //             }
                    //         })
                    //         if(!f){
                    //             utilityValue.push(0);
                    //         }
                    // });
                    // console.log(Object.keys*utili)
                    console.log("label",utilityLabel);
                    console.log("value",utilityValue);

                    // let chartConfig = {
                    //     type: 'bar',
                    //     data : {
                    //         // labels : utilityLabel,
                    //         // labels: [...Object.keys(utilityList)],
                    //         datasets : [{
                    //             barPercentage: 0.5,
                    //             barThickness: 6,
                    //             maxBarThickness: 8,
                    //             minBarLength: 2,
                    //             data: utilityValue
                    //             // data : utilityDatapoints
                    //         }]
                    //         // data : utilityValue
                    //         // data : utilityDatapoints
                    //     }
                    //     // data : utilityDatapoints
                    // };

                    if(chartContainer && chartContainer.current){
                        // console.log('here', chartContainer.current)
                    let newChartInstance = new Chartjs(chartContainer.current, chartConfig)
                    // let newChartInstance = new Chartjs(canvas, chartConfig)
                    console.log(newChartInstance)
                    setChartInstance(newChartInstance)
                }
                // let newChartInstance = new Chartjs(canvas, chartConfig)
                // setChartInstance(newChartInstance)






                    setUtilities(utilityList)
                    setRent(rentList)
                    setTotal(totalList)




                    
    

                    // setLoading(false)
                
            } catch (e) {
                console.log(e);
=======
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
>>>>>>> c4c97771b5ca07f173b18ebf593264a90983289c
            }
                    ]
        }
<<<<<<< HEAD
        getData();
        // config(utilityLabel, utilityValue)
        // console.log('val',utilityValue)
        console.log('val',utilityDatapoints)

    }, [chartContainer, change]
    )


    // let config = (ulab, uval) => {
    //     // let canvas = document.getElementById("utilityChart").getContext("2d");
    //     console.log(uval)
    //     // let utilityLabel = [];
    //     // clist.map((item) => {
    //     //     utilityLabel.push(item.name)
    //     //     utilityValue.push(uList[item.name])
    //     // });

    //     let chartConfig = {
    //     type: 'bar',
    //     data : {
    //         // labels : utilityLabel,
    //         // labels: [...Object.keys(utilityList)],
    //         datasets : [{
    //             barPercentage: 0.5,
    //             barThickness: 6,
    //             maxBarThickness: 8,
    //             minBarLength: 2,
    //             data: uval
    //             // data : utilityDatapoints
    //         }]
    //         // data : utilityValue
    //         // data : utilityDatapoints
    //     }
    //     // data : utilityDatapoints
    // };

    
    // let newChartInstance = new Chartjs(chartContainer.current, chartConfig)

    // // let newChartInstance = new Chartjs(canvas, chartConfig)
    // setChartInstance(newChartInstance)
    // }



    if (loading === false) {
	return (
        // <div className="container container1 ">
        //     <p>{Object.keys(utilities)}</p>
        //     <p>{utilities["Stevens Institute of Technology"]}</p>
        //     <p>{rent["Stevens Institute of Technology"]}</p>
        //     <p>{total["Stevens Institute of Technology"]}</p>
        // </div>    

        <div>
         <canvas ref={chartContainer} />
        {/* <canvas id="utilityChart" height="500" width="500"></canvas> */}
        <button onClick={e => setChange(!change)} > CLICK ME !</button>
        </div>



    )
    }
    else{
        return(
            <div className="container container1 ">
				<img className="loadingGIF" width="5%" src="/imgs/loading.gif" alt="img" />
			</div>
        )
=======
        setChartData(x);

    } catch (e) {
        console.log(e)
>>>>>>> c4c97771b5ca07f173b18ebf593264a90983289c
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