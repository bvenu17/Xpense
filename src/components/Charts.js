import '../App.css';
import React, { useState, useEffect, useRef} from 'react';
import Chartjs from 'chart.js'
import { getAllPostsforCollege, getAllColleges } from '../firebase/FirestoreFunctions'

const Charts = () => {

    const [collegeList, setCollegeList] = useState();
    const [utilities , setUtilities] = useState();
    const [rent , setRent] = useState();
    const [total , setTotal] = useState();

    const [chartInstance, setChartInstance] = useState(null);
    const chartContainer = useRef(null);

    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        let utilityLabel = [];
        let utilityValue = [];

        async function getData() {
            try {
                console.log("Enter use effect func")
                //get all colleges from the db   
                let clist = await getAllColleges();
                setCollegeList(clist);
                console.log("fetched all colleges from db", clist);


                let rentList = {};
                let utilityList = {};
                let totalList = {};

                
                let utilityDatapoints=[];
                // let utilityLabel = [];
                // let utilityValue = [];

                //retreive the details of selected college from the list
                clist.map(async (item) => {

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
                            // utilityDatapoints.push({x:item.name, y:utilityList[item.name]})

                            totalList[item.name]= sumTotal/count
                    }
                    else{
                        utilityLabel.push(item.name)
                        utilityValue.push(0)
                        // utilityDatapoints.push({x: item.name, y: 0})
                    }
                }
                );


                    // config(utilityLabel, utilityValue);


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

                //     if(chartContainer && chartContainer.current){
                //         console.log("here")
                //     let newChartInstance = new Chartjs(chartContainer.current, chartConfig)
                //     // let newChartInstance = new Chartjs(canvas, chartConfig)
                //     setChartInstance(newChartInstance)
                // }
                // let newChartInstance = new Chartjs(canvas, chartConfig)
                // setChartInstance(newChartInstance)






                    setUtilities(utilityList)
                    setRent(rentList)
                    setTotal(totalList)




                    
    

                    // setLoading(false)
                
            } catch (e) {
                console.log(e);
            }
        }
        getData();
        config(utilityLabel, utilityValue)
    }, []
    )

    const config = (ulab, uval) => {
        // let canvas = document.getElementById("utilityChart").getContext("2d");
        console.log(uval)
        // let utilityLabel = [];
        // clist.map((item) => {
        //     utilityLabel.push(item.name)
        //     utilityValue.push(uList[item.name])
        // });

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
                data: uval
                // data : utilityDatapoints
            }]
            // data : utilityValue
            // data : utilityDatapoints
        }
        // data : utilityDatapoints
    };

    
    let newChartInstance = new Chartjs(chartContainer.current, chartConfig)

    // let newChartInstance = new Chartjs(canvas, chartConfig)
    setChartInstance(newChartInstance)
    }



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
        <button onClick={config} > CLICK ME !</button>
        </div>



    )
    }
    else{
        return(
            <div className="container container1 ">
				<img className="loadingGIF" width="5%" src="/imgs/loading.gif" alt="img" />
			</div>
        )
    }
}


export default Charts;