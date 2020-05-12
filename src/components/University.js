import React, {useState, useEffect} from 'react';
import '../App.css';
import {getPost, getAllPostsforCollege, getAllColleges} from '../firebase/FirestoreFunctions'

const University = (props) => {
    //state for college id fomr url
    const [id, setId] = useState(undefined);
    
    const [details, setDetails] = useState(undefined);
    const [posts, setPosts] = useState();
    const [collegeList, setCollegeList] = useState();

    useEffect(() => {
            setId(parseInt(props.match.params.id));
            async function getData() {
                try {      
                    let clist = await getAllColleges();
                    setCollegeList(clist);

                    clist.map(async (item) =>{
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
            getData();
        }, []
    )
    return (





        <div>
        <div className = "post univ">       
        <div className = "container container1">
        <hr className = "hRule"></hr>

        {details && details ? (

            <div className = "row">
            <div className = "col-lg-2 col-md-2 col-sm-12">
            <img src="/static/media/college-logo.09e9da4c.jpg" alt="defaultpic" className = "univLogo"></img><br />
                </div>
                <div className = "col-lg-10 col-md-10 col-sm-12">

                <div className = "row">
                    <div className = "col-lg-12 col-md-12 col-sm-12 uniName">
                    {details.name}<br/>
                    </div>

                    <div className = "col-lg-6 col-md-6 col-sm-12">
                    <i className="fas fa-map-marker-alt icons2" title = "Address"></i> {details.street},
            {details.city},
            {details.state},
            {details.zip}
                        </div>
                        <div className = "col-lg-6 col-md-6 col-sm-12">
                        <i className="fas fa-link icons2" title ="Website"></i>{details.url}
                            </div>
                            <div className = "col-lg-6 col-md-6 col-sm-12">
                                <span className = "tut">Tuition:</span> ${details.tuition} per year
                                </div>
                            <div className = "col-lg-6 col-md-6 col-sm-12">
                            <span className = "tut">Average Expenses:</span> ${details.avgExpense} per month
                                </div>




                    </div>   
            <br/>
                </div>


            </div>
          
       

        ) : (<p status={404}> COLLEGE ERROR</p>)}
            </div>
            </div> 

            <div className = "container container1">
            {posts && posts ? (<div>{posts.map((item) => {
                return(
                <div key={item.id}>
                        TITLE: {item.title}<br/>
                        AUTHOR ID: {item.authorId}<br/>
                        COMMENTS: {item.authorName}<br/>
                        CATEGORY: {item.category}<br/>
                        DESCRIPTION: {item.description}<br/>
                </div>)
            })}</div>) : (<h2 status={404}> NO POSTS </h2>)}
        </div>
        </div>
    )
}



export default University;
