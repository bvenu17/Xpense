import '../App.css';
import React, { useState, useEffect} from 'react';
import { getAllPostsforCollege, getAllColleges } from '../firebase/FirestoreFunctions'

const Charts = () => {

    const [collegeList, setCollegeList] = useState();
    const [utilities , setUtilities] = useState();
    const [rent , setRent] = useState();
    const [total , setTotal] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
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
                            totalList[item.name]= sumTotal/count
                    }
                }
                );
                    setUtilities(utilityList)
                    setRent(rentList)
                    setTotal(totalList)

                    setLoading(false)
                
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []
    )

    if (loading === false) {
	return (
        <div className="container container1 ">
            <p>{utilities["Stevens Institute of Technology"]}</p>
            <p>{rent["Stevens Institute of Technology"]}</p>
            <p>{total["Stevens Institute of Technology"]}</p>
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