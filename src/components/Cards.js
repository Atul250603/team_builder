import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import { useEffect, useState } from "react";
function Cards(props){
    const [searchParams,setSearchParams]=useSearchParams();
    const[pageNum,setPageNum]=useState(1);
    
    useEffect(()=>{
        if(searchParams.get('page')!==null){
            setPageNum(Number(searchParams.get('page')));
        } 
        let newData=[...props.mockdata];
        if(searchParams.get('domain')!==null && searchParams.get('domain').length>0){
            let domain=searchParams.get('domain').split(',');
            newData=newData.filter((element)=>domain.includes(element.domain));
        }
        if(searchParams.get('gender')!==null&& searchParams.get('gender').length>0){
            let gender=searchParams.get('gender').split(',');
            newData=newData.filter((element)=>gender.includes(element.gender));
        }
        if(searchParams.get('available')!==null && searchParams.get('available').length>0){
            console.log(searchParams.get('available'));
            console.log(searchParams.get('available').length);
            let available=searchParams.get('available').split(',');
            newData=newData.filter((element)=>available.includes(""+(element.available)));
        }
        props.setData(newData);
    },[searchParams])
    return(
        <div className="cards">
            {
                props.data.slice((pageNum-1)*20,pageNum*20).map((element,idx)=>{
                    if(props.team.findIndex((teamElement)=>teamElement.domain===element.domain && teamElement.id!==element.id)!==-1){
                        return <Card data={element} key={element.id} setTeam={props.setTeam} team={props.team} disabled={true}/>
                    }
                    else{
                        return <Card data={element} key={element.id} setTeam={props.setTeam} team={props.team} disabled={false}/>
                    }
                })
            }
        </div>
    )
}
export default Cards;