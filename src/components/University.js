//basic imports
import React, { useState, useEffect, useContext } from 'react';
//css imports
import '../App.css';
//firebase functions import
import { AuthContext } from "../firebase/Auth";
import { getUser, getPost, addCommentToPost, getAllPostsforCollege, getAllColleges } from '../firebase/FirestoreFunctions'

const University = (props) => {
    //user states
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState();
    //state for college id fomr url
    const [id, setId] = useState(undefined);
    //state for all colleges present in the db
    const [collegeList, setCollegeList] = useState();
    //state for college details from the db
    const [details, setDetails] = useState(undefined);
    //state for all posts linked to the university
    const [posts, setPosts] = useState();
    //temp state for post id to add comment
    const [postId, setPostId] = useState();
    //state for form submission
    const [formSubmit, setFormSubmit] = useState(false);

    //lifecycle method
    useEffect(() => {
        setId(parseInt(props.match.params.id));
        async function getData() {
            try {
                console.log("Enter use effect func")
                //fetch user details
                let u = await getUser(currentUser.uid);
                setUser(u);
                console.log("fetched user details", u)
                //get all colleges from the db   
                let clist = await getAllColleges();
                setCollegeList(clist);
                console.log("fetched all colleges from db", clist);

                //retreive the details of selected college from the list
                clist.map(async (item) => {
                    if (item.id === props.match.params.id) {
                        setDetails(item);
                        //retreive all the posts of the selected college
                        const p = await getAllPostsforCollege(item.id);
                        if (p) {
                            setPosts(p);
                        }
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, [formSubmit, currentUser]
    )

    //submit form for comments
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const { comment } = event.target.elements;
        console.log("post id is" + postId + " comment value is " + comment.value + user.firstName)
        try {
            //add comment to the post db
            await addCommentToPost(postId, user.firstName, comment.value)
            setFormSubmit(true);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <div className="post univ">
                <div className="container container1">
                    <hr className="hRule"></hr>

                    {details && details ? (

                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12">
                                <img src="/static/media/college-logo.09e9da4c.jpg" alt="defaultpic" className="univLogo"></img><br />
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-12">

                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 uniName">
                                        {details.name}<br />
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <i className="fas fa-map-marker-alt icons2" title="Address"></i> {details.street},
                                        {details.city},
                                        {details.state},
                                         {details.zip}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <i className="fas fa-link icons2" title="Website"></i>{details.url}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <span className="tut">Tuition:</span> ${details.tuition} per year
                                </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <span className="tut">Average Expenses:</span> ${details.avgExpense} per month
                                </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    ) : (<p status={404}> COLLEGE ERROR</p>)}
                </div>
            </div>

            {/* Display all the posts for the selected college */}

            <div className="container container1">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {posts && posts ? (
                            posts.map((item) => {
                                return (
                                    <div key={item.id} className="post">
                                        <div className="postContent">
                                            <p>
                                                Title : {item.title}
                                                <br></br>
                                            Author Name : {item.authorName}
                                                <br></br>
                                            Description : {item.description}
                                                <br></br>
                                            Date : {item.date}
                                                <br></br>
                                            Time:{item.time}
                                                <br></br>
                                            Category : {item.category}
                                                <br></br>
                                            Expense : ${item.expenses}
                                                <br></br>
                                                <img width="100px" src={item.postPicture} alt="img-post" />
                                            </p>

                                            <div className="comments">

                                                <br></br>
                                                {/* display comments of each post */}
                                                <h2>COMMENTS GO HERE</h2>
                                                <div>
                                                    {item.comments ? (
                                                        item.comments.map((comm) => {
                                                            return (
                                                                <div style={{border:"3px solid black",margin:"20px"}}>
                                                                    <p>
                                                                        <b>{comm.username} </b>
                                                                        <br></br>
                                                                        {comm.comment}
                                                                    </p>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (<p>No comments to display</p>)}
                                                </div>

                                                <form onSubmit={handleCommentSubmit}>
                                                    <input name="comment" id="comment" type="text" placeholder="enter comment" />
                                                    <button onClick={() => setPostId(item.id)} type="submit">Send comment</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                                <h2 status={404}> NO POSTS </h2>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>



    )
}



export default University;
