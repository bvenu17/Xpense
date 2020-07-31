import React from 'react';
import '../App.css';

const About = () => {
    return (
        <div className="container container1">
            <h1>What do we do?</h1>
            <br></br>
            <div className="devName post">
            Every year, hundreds of thousands of international students come to the United States for their education. Information regarding courses, tuition fees, university facilities, etc is available in abundance on every school’s website. But when it comes to living expenses and resources , the figures are always an average assumption of numbers rather than actual data. Here is where our application comes into play!
            <br></br><br></br>
            Our application is designed to give incoming students data from students that have actually studied in these universities. The data would mainly include their monthly expenses, rent according to particular locations, pictures of the houses you get for the rent you pay, the grocery resources . It is a social media approach where current or existing students can post all the above information. It will also allow incoming students to comment on posts, filter by location or university. Currently, our focus will be on universities in the states of  New Jersey and New York.
            <br></br>
            </div>
         <br></br>
            <h1>What locations do we cover?</h1>
            <br></br>
            <div className="row locationCardRow post">
                <div className="col-lg-6 col-md-6 col-sm-6 locationCard">
                    <div className="locationDes">
                        <h1 className = "loc">New Jersey</h1>
                        <br></br>

                    
                        <p className="devName">New Jersey is a northeastern U.S. state with some 130 miles of Atlantic coast. Jersey City, across the Hudson River from Lower Manhattan, is the site of Liberty State Park, where ferries embark for nearby Ellis Island, with its historic Immigration Museum, and the iconic Statue of Liberty. The Jersey Shore includes notable resort towns like historic Asbury Park and Cape May, with its preserved Victorian buildings.</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 locationCard">
                    <img className= "aboutImg" src="/imgs/newjersey.jpg" alt="img" />
                </div>
            </div>
            <div className="row locationCardRow post">
                <div className="col-lg-6 col-md-6 col-sm-6 locationCard">
                    <img className= "aboutImg" src="/imgs/newyork.jpg" alt="img" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 locationCard">
                    <div className="locationDes">
                        <h1 className = "loc">New York</h1>
                        <br></br>

                      
                        <p className="devName">New York is a state in the northeastern U.S., known for New York City and towering Niagara Falls. NYC’s island of Manhattan is home to the Empire State Building, Times Square and Central Park. The Brooklyn Bridge connects Manhattan with the borough of Brooklyn. The iconic Statue of Liberty stands in New York Harbor. To the east, Long Island has beaches, the Montauk Lighthouse, the ritzy Hamptons and Fire Island.</p>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <h1>Who are we?</h1>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-lg-1 col-md-0 col-sm-0"></div>

                <div className="col-lg-2 col-md-4 col-sm-4">
                    <div className="devCard post">
                        <img src="/imgs/vedadnya.jpg" className = "avatarPic2 aboutImg" alt="img" />
                        <p className="devName2"><br></br>Vedadnya <br></br> Jadhav</p>

                    </div>
                  
                </div>
      
                <div className="col-lg-2 col-md-6 col-sm-6">
                    <div className="devCard post">
                        <img src="/imgs/venu.jpg" className = "avatarPic2 aboutImg" alt="img" />
                        <p className="devName2"><br></br>Venugopal <br></br> Balaji</p>

                    </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                    <div className="devCard post">
                        <img src="/imgs/chirag.jpg" className = "avatarPic2 aboutImg" alt="img" />
                        <p className="devName2"><br></br>Chirag <br></br> Kamble</p>

                    </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                    <div className="devCard post">
                        <img src="/imgs/rohan.jpg" className = "avatarPic2 aboutImg" alt="img" />
                        <p className="devName2"><br></br>Rohan <br></br> Shah</p>

                    </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6">
                    <div className="devCard post">
                        <img src="/imgs/harish.jpg" className = "avatarPic2 aboutImg" alt="img" />
                        <p className="devName2"><br></br>Harish <br></br> Nair</p>

                    </div>
                </div>

                <div className="col-lg-1 col-md-0 col-sm-0"></div>

            </div>
            <br></br><br></br><br></br>
        </div>
    )
}


export default About;