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
        <div className='unidetails'>
        <div>
        {details && details ? (
            <div>
            {details.id}<br/>
            {details.name}<br/>
            {details.street}<br/>
            {details.city}<br/>
            {details.state}<br/>
            {details.zip}<br/>
            {details.tution}<br/>
            </div>
        ) : (<p status={404}> COLLEGE ERROR</p>)}
            </div>
            
            <div>
            {posts && posts ? (<div>{posts.map((item) => {
                return(
                <div key={item.authorId}>
                        TITLE: {item.Title}<br/>
                        AUTHOR ID: {item.authorId}<br/>
                        COMMENTS: {item.comments}<br/>
                        CATEGORY: {item.category}<br/>
                        DESCRIPTION: {item.description}<br/>
                </div>)
            })}</div>) : (<p status={404}> NO POSTS </p>)}
        </div>
        </div>
    )
}


export default University;
