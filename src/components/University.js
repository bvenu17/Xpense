//basic imports
import React, { useState, useEffect, useContext } from 'react';
import Chat from './Chat';
import SignIn from './SignIn';
import SignUp from './SignUp';
//css imports
import '../App.css';
//firebase functions import
import { AuthContext } from "../firebase/Auth";
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { getUser, getPost, addCommentToPost, getAllPostsforCollege, getAllColleges } from '../firebase/FirestoreFunctions'

const University = (props) => {
    //user states
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState();
    //login for comments
    const [logSign, setlogSign] = useState("Signup");
    const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const setLogin = () => setlogSign("Login")
	const setSignup = () => setlogSign("SignUp")
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
    //
    const [averge , setAverage] = useState(0);

    //lifecycle method
    useEffect(() => {
        setId(parseInt(props.match.params.id));
        async function getData() {
            try {
                console.log("Enter use effect func")
                //fetch user details
                if(currentUser) {
                let u = await getUser(currentUser.uid);
                setUser(u);
                console.log("fetched user details", u)
                }
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
                        console.log("All post for college is",p)
                        //sort the posts
                        let sortedPosts;
                        if(p){
                         sortedPosts = p.sort((a, b) => b.createdAt - a.createdAt)
                        } else {
                            sortedPosts=p;
                        }
                        //average expenses for student of selected university
                        let count = 0;
                        let sum = 0 ;
                        if (sortedPosts) {
                            sortedPosts.map((item) => {
                                    sum = sum + parseInt(item.rent) + parseInt(item.utilities)
                                    count += 1 
                            })
                            setAverage(sum/count)
                            setPosts(sortedPosts);
                        }
                    }
                }
                
                );

                
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
            await addCommentToPost(postId, user.firstName + " " + user.lastName, comment.value)
            setFormSubmit(true);
        } catch (error) {
            alert(error);
        }
        comment.value=""
    }

    return (
        <div>
            {/* display university details */}
            <div className="post univ">
                <div className="container container1">
                    <hr className="hRule"></hr>

                    {details && details ? (

                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12">
                                <img src={details.logoUrl} alt="defaultpic" className="univLogo"></img><br />
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
                                        <i className="fas fa-link icons2" title="Website"></i> {details.url}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <span className="tut">Tuition:</span> ${details.tuition} per year
                                </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                    <span className="tut">Average Expenses:</span> ${averge} per month
                                </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    ) : <div className="container container1 ">
                    <img className="loadingGIF" width="5%" src="/imgs/loading.gif" alt="img" />
                </div>}
                </div>
            </div>

            {/* Display all the posts for the selected college */}

            <div className="container container1">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                    {posts && posts ? (
                            posts.map((item) => {
                                return (
                                    <div className="post">
                                        	<div className="headerPost">
											<div className="avatarSide">
												<img src={item.userProfilePic?item.userProfilePic:'/imgs/profile.png'}  className="avatarPic" alt = "profilePic"></img>
											</div>
											<div className="personal">
												<div className="author"> {item.authorName} </div>

												<div className="college">{item.collegeName}</div>
												<div className="time">{item.time}, {item.date}</div><br>
												</br>
											</div>
                                            <div className="postContent">
                                            <br></br>
                                                <Carousel>
                                                    {item.postPicture.map((photo) => {
                                                    return(
                                                        <Carousel.Item>
                                                        <img key={photo} className="postImg" src={photo} alt="img-post" />
                                                        </Carousel.Item>
                                                    )
                                                    })}
                                                </Carousel>
                                                <br></br>
                                                <p class="postTitle">
                                                    {item.title}
                                                </p>
                                            </div>
										</div>
									<div className="postContent" id = "module">
									<p className="collapse" id="collapseExample" aria-expanded="false">
									{item.description}
									<br></br>
											<i className="fas fa-shopping-cart icons" title="groceries"></i>  {item.groceries}
											<br></br>
											<i className="fas fa-home icons" title="rent"></i>  ${item.rent} per month Rent
											<br></br>
											<i className="fas fa-bolt icons" title="utlities"></i>  ${item.utilities} per month Utilities
											<br></br>
											<i className="fas fa-subway icons" title="transport"></i>  {item.transport}
											<br></br>
									
											</p>
											<a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>

									</div>
    
                                            <div className="comments">
    
                                                <br></br>
                                                <h2>COMMENTS GO HERE</h2>
                                                <div>
												{item.comments ? (
													item.comments.map((comm) => {
														return (
															<div class = "comments">
																<div class = "comment">
																
																	<span class = "userName">{comm.username}</span> 
																	<br></br>
																	{comm.comment}
																</div>
															</div>
														)
													})
												) : (<p>No comments to display</p>)}
											</div>
                                                {currentUser ? (

                        		<form onSubmit={handleCommentSubmit}>
											
                                <input name="comment" className='comment2' id="comment" type="text" placeholder="Add a comment..." />	
                            
                                <button onClick={() => setPostId(item.id)} class = "commentButt" type="submit"><i class="fas fa-paper-plane icons"></i></button>
            
                        </form>
                                                ): (
                                                <div>
                                                    {/* <p>You need to login to comment</p> */}
                                                    <form>
                                                        <input name="comment" className='comment2' id="comment" type="text" placeholder="Add a comment..." onClick={handleShow} />
                                                        <button class="commentButt" type="submit"><i class="fas fa-paper-plane icons" onClick={handleShow} ></i></button>
                                                            <Modal className="loginForm" show={show} onHide={handleClose} >
                                                                <div className = "modalContent">
                                                                    {/* <h3> Please Provide College Details To Post !</h3> */}
                                                                <Button variant="primary" className="modalHeader" onClick={logSign === "Login" ? setSignup : setLogin}>
												                    {logSign === "Login" ? "Have an account? Login here" : "Don't have an account? Signup Now"}
											                    </Button>
                                                                    {logSign === "Login" ? <SignUp></SignUp> : <SignIn></SignIn>}
                                                                </div>
                                                            </Modal>
                                                    </form>
                                                </div>
                                                )}

                                            </div>
                                        </div>
                                   
                                )
                            })
                        ) : (
                                <h2 status={404}> NO POSTS </h2>
                            )
                        }
                    </div>

                    <div class = "col-lg-4 col-md-12 col-sm-12">
                    <div className="post chatBox">
							<h2>GLOBAL CHAT</h2>
							<Chat></Chat>
						</div>
                    </div>


                </div>
            </div>
        </div>



    )
}



export default University;
