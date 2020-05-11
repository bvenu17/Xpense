import React, {useState, useEffect} from 'react';
import '../App.css';
import {getPost, getAllPostsforCollege, getAllColleges} from '../firebase/FirestoreFunctions'

const University = (props) => {
    const [Id, setId] = useState(undefined);
    const [details, setDetails] = useState(undefined);
    const [posts, setPosts] = useState(undefined);
    const [collegeList, setCollegeList] = useState();

    useEffect(() => {
            setId(parseInt(props.match.params.id));
            async function getData() {
                try {      
                    let clist = await getAllColleges();
                    setCollegeList(clist);

                    clist.map(async(item) =>{
                        if(item.id === props.match.params.id){
                            setDetails(item);
                            const p = await getAllPostsforCollege(item.id);
                                if(p){
                                    setPosts(p);
                            }
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            }
            console.log(posts)
            getData();
        }, []
    )
    return (





        <div>
        <div class = "post univ">       
        <div class = "container container1">
        <hr class = "hRule"></hr>

        {details && details ? (

            <div class = "row">
            <div class = "col-lg-2 col-md-2 col-sm-12">
            <img src="/static/media/college-logo.09e9da4c.jpg" alt="defaultpic" class = "univLogo"></img><br />
                </div>
                <div class = "col-lg-10 col-md-10 col-sm-12">

                <div class = "row">
                    <div class = "col-lg-12 col-md-12 col-sm-12 uniName">
                    {details.name}<br/>
                    </div>

                    <div class = "col-lg-6 col-md-6 col-sm-12">
                    <i class="fas fa-map-marker-alt icons2" title = "Address"></i> {details.street},
            {details.city},
            {details.state},
            {details.zip}
                        </div>
                        <div class = "col-lg-6 col-md-6 col-sm-12">
                        <i class="fas fa-link icons2" title ="Website"></i>{details.url}
                            </div>
                            <div class = "col-lg-6 col-md-6 col-sm-12">
                                <span class = "tut">Tuition:</span> ${details.tuition} per year
                                </div>
                            <div class = "col-lg-6 col-md-6 col-sm-12">
                            <span class = "tut">Average Expenses:</span> ${details.avgExpense} per month
                                </div>




                    </div>   
            <br/>
                </div>


            </div>
          
       

        ) : (<p status={404}> COLLEGE ERROR</p>)}
            </div>
            </div> 

            <div class = "container container1">
            {posts && posts ? (<div>{posts.map((item) => {
                return(
                <div key={item.authorId}>
                        TITLE: {item.Title}<br/>
                        AUTHOR ID: {item.authorId}<br/>
                        COMMENTS: {item.comments}<br/>
                        CATEGORY: {item.category}<br/>
                        DESCRIPTION: {item.description}<br/>
                </div>)
            })}</div>) : (<h2 status={404}> NO POSTS </h2>)}
        </div>
        </div>
    )
}



export default University;
