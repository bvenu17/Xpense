import React, {useState, useEffect} from 'react';
// import * as firestore from '../firebase/FirestoreFunctions'
import '../App.css';
import {getAllPosts} from '../firebase/FirestoreFunctions'


let collegeData=[
    {
        "id": 1,
        "name": "Princeton University",
        "street": "1 Nassau Hall",
        "city": "Princeton",
        "state": "NJ",
        "zip": "08544",
        "tuition": 16192,
        "posts": [],
        "preferredAreas": [], 
        "avgExpense": 0,
        "logo": "Princeton.png",
        "url": "princeton.edu"
    },
    {
        "id": 2,
        "name": "Stevens Institute of Technology",
        "street": "1 Castle Point Terrace",
        "city": "Hoboken",
        "state": "NJ",
        "zip": "08822",
        "tuition": 39862,
        "posts": [],
        "preferredAreas": [], 
        "avgExpense": 0,
        "logo": "stevens.png",
        "url": "stevens.edu"
    },
    {
        "id": 3,
        "name": "Rutgers University - New Brunswick",
        "street": "100 Sutphen Road",
        "city": "Piscataway",
        "state": "NJ",
        "zip": "08854",
        "tuition": 16295,
        "posts": [],
        "preferredAreas": [], 
        "avgExpense": 0,
        "logo": "rutgers.png",
        "url": "newbrunswick.rutgers.edu"
    },
    {
        "id": 4,
        "name": "The College of New Jersey",
        "street": "2000 Pennington Road",
        "city": "Ewing",
        "state": "NJ",
        "zip": "08628",
        "tuition": 23414,
        "posts": [],
        "preferredAreas": [], 
        "avgExpense": 0,
        "logo": "rutgers.png",
        "url": "tcnj.edu"
    },
    {
        "id": 5,
        "name": "Rutgers University - Newark",
        "street": "249 University Avenue, Blumenthal Hall",
        "city": "Newark",
        "state": "NJ",
        "zip": "07102",
        "tuition": 11301,
        "posts": [],
        "preferredAreas": [], 
        "avgExpense": 0,
        "logo": "rutgers.png",
        "url": "newark.rutgers.edu"
    }
]

const Unidata = (props) => {
    const [Id, setId] = useState(undefined);
    const [details, setDetails] = useState(undefined);
    const [posts, setPosts] = useState(undefined);

    useEffect(
        () => {
            setId(parseInt(props.match.params.id));
            async function getData() {
                try {
                    for(let i=0;i<collegeData.length;i++){
                        if(collegeData[i].id === Id){
                            let d = collegeData[i]
                            setDetails(d);
                            const c = await getAllPosts(d.id);
                            setPosts(c);
                            break;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            getData();
        }, [Id,props.match.params.id,details,posts]
    )
    return (
        <div className='unidetails'>
        {!details ? (<p status={404}> ERROR</p>):(
            <div> {/* details of the college */}
            {details.id}<br/>
            {details.name}<br/>
            {details.street}<br/>
            {details.street}<br/>
            {details.city}<br/>
            {details.state}<br/>
            {details.zip}<br/>
            {details.tution}<br/>
            </div>
        )}
        {!posts ? (<p status={404}> ERROR </p>) : (
            <div>
                {posts}  {/* list of posts of the college */}
            </div>
        )}

        </div>
    )
}


export default Unidata;