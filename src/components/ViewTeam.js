import { useNavigate } from "react-router-dom";
import Card from "./Card";

function ViewTeam(props){
    const navigate=useNavigate();
    return(
        <div className="viewTeamCards">
        <div className="heading">
        <div className="backBtn">
            <button onClick={(e)=>{navigate('/')}}>&larr;</button>
        </div>
        <div className="title">
            Your Team
        </div>
        </div>
        <div className="cards">
        {(props.team.length>0)?props.team.map((element,idx)=><Card data={element} key={element.id} setTeam={props.setTeam} team={props.team} disabled={false}/>):<> Create A Team....</>}
        </div>
        </div>
    )
}
export default ViewTeam;