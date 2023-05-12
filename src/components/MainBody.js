import { useEffect, useState } from "react";
import Cards from "./Cards";
import { useSearchParams,NavLink } from "react-router-dom";
import Pagination from "./Pagination";
function MainBody(props){
    const [search,setSearch]=useState('');
    const [domain,setDomain]=useState([]);
    const [gender,setGender]=useState([]);
    const [availability,setAvailability]=useState([]);
    const[domainQuery,setDomainQuery]=useState("");
    const[genderQuery,setGenderQuery]=useState("");
    const[availableQuery,setAvailableQuery]=useState("");
    const [searchParams,setSearchParams]=useSearchParams();
    useEffect(()=>{
        props.mockdata.forEach((element)=>{
            if(!domain || domain.indexOf(element.domain)===-1){
                let newDomain=[...domain];
                newDomain.push(element.domain);
                setDomain(newDomain);
            }
            if(!gender || gender.indexOf(element.gender)===-1){
                let newGender=[...gender];
                newGender.push(element.gender);
                setGender(newGender);
            }
            if(!availability || availability.indexOf(element.available)===-1){
                let newAvailability=[...availability];
                newAvailability.push(element.available);
                setAvailability(newAvailability);
            }
        })
    },[domain,gender,availability,props.mockdata])
    function filterHandler(e){
        let query1,query2,query3;
        const newsearchParams = new URLSearchParams(searchParams);
        if(e.target.checked){
           
            if(e.target.name==='domain' && domainQuery.includes(e.target.value)===false){
                query1=domainQuery+`${e.target.value},`;
                setDomainQuery(query1);
                newsearchParams.set('domain',query1.substring(0,query1.length-1));
            }
            if(e.target.name==='gender' && genderQuery.includes(e.target.value)===false){
                query2=genderQuery+`${e.target.value},`;
                setGenderQuery(query2);
                newsearchParams.set('gender',query2.substring(0,query2.length-1));
            }
            if(e.target.name==='available' && availableQuery.includes(e.target.value)===false){
                query3=availableQuery+`${e.target.value},`;
                setAvailableQuery(query3);
                newsearchParams.set('available',query3.substring(0,query3.length-1));
            }
            newsearchParams.set('page',1);
        }
        else{
            if(e.target.name==='domain'){
                query1=domainQuery;
                query1=query1.replace(`${e.target.value},`,'');
                setDomainQuery(query1);
                newsearchParams.set('domain',query1.substring(0,query1.length-1));
            }
            if(e.target.name==='gender'){
                query2=genderQuery;
                query2=query2.replace(`${e.target.value},`,'');
                setGenderQuery(query2);
                newsearchParams.set('gender',query2.substring(0,query2.length-1));
            }
            if(e.target.name==='available'){
                query3=availableQuery;
                query3=query3.replace(`${e.target.value},`,'');
                setAvailableQuery(query3);
                newsearchParams.set('available',query3.substring(0,query3.length-1));
            }
            newsearchParams.set('page',1);
        }
        setSearchParams(newsearchParams);
    }
    function onChangeHandler(e){
        setSearch(e.target.value);
        let newData=props.mockdata.filter(element=>(((element.first_name+" "+element.last_name).toLowerCase()).includes((e.target.value).toLowerCase())));
        props.setData(newData);
        const newsearchParams = new URLSearchParams(searchParams);
        newsearchParams.set('page',1);
        setSearchParams(newsearchParams);
    }
    return(
        <div className="main">
            <div className="topBar">
                <div className="searchBar">
                <input type="text" name="search" id="seach" value={search} onChange={(e)=>onChangeHandler(e)} placeholder="Search By Name"/>
                </div>
                <div className="viewTeam">
                    <NavLink to="/viewTeam">View Team</NavLink>
                </div>
            </div>
            <div className="filters">
                <div className="title">Filters</div>
                <div className="data">
                    <div className="domain">
                        <div className="subtitle">Domain</div>
                        <div className="filterItems">
                        {
                            (domain.length>0)?domain.map((element,idx)=><span key={idx}><label>{element}</label><input type="checkbox"  name="domain" onChange={(e)=>filterHandler(e)} value={element}/></span>):<></>
                        }
                        </div>
                    </div>
                    <div className="gender">
                        <div className="subtitle">Gender</div>
                        <div className="filterItems">
                        {
                            (gender.length>0)?gender.map((element,idx)=><span key={idx}><label>{element}</label><input type="checkbox" name="gender" onChange={(e)=>filterHandler(e)} value={element}/></span>):<></>
                        }
                        </div>
                    </div>
                    <div className="availability">
                        <div className="subtitle">Availability</div>
                        <div className="filterItems">
                        {
                            (availability.length>0)?availability.map((element,idx)=><span key={idx}><label>{(element)?"Available":"Not Available"}</label><input type="checkbox"  name="available" onChange={(e)=>filterHandler(e)} value={element}/></span>):<></>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <Cards data={props.data} setData={props.setData} mockdata={props.mockdata} team={props.team} setTeam={props.setTeam}/>
            <Pagination length={props.data.length}/>
        </div>
    )
}
export default MainBody;