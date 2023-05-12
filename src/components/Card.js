function Card(props){
    function addTeam(e){
        let newTeam=[...props.team];
        newTeam.push(props.data);
        props.setTeam(newTeam);
        e.target.style="display:none;";
        let removeBtn=e.target.nextElementSibling;
        if(removeBtn){
            removeBtn.style="display:inline;"
        }
    }
    function removeFromTeam(e){
        let newTeam=[...props.team];
        let idx=newTeam.findIndex((element)=>element.id===props.data.id);
        newTeam.splice(idx,1);
        props.setTeam(newTeam);
        e.target.style="display:none;";
        let addBtn=e.target.previousElementSibling;
        if(addBtn){
            addBtn.style="display:inline;"
        }
    }
    return(
        <div className="card">
            <div className="image">
                <img src={props.data.avatar} alt="avatar"/>
            </div>
            <div className="data">
                <div className="id">{props.data.id}</div>
                <div className="name">{props.data.first_name +" "+props.data.last_name}</div>
                <div className="email">{props.data.email}</div>
                <div className="gender">{props.data.gender}</div>
                <div className="domain">{props.data.domain}</div>
                <div className="btn">{(props.team.indexOf(props.data)!==-1)?<><button onClick={(e)=>addTeam(e)} className="addBtn" style={{"display":"none"}}>Add to team</button><button onClick={(e)=>removeFromTeam(e)} className="removeBtn"  style={{"display":"inline"}}>Remove From Team</button></>:(props.data.available===true && !props.disabled)?<><button onClick={(e)=>addTeam(e)} className="addBtn">Add to team</button><button onClick={(e)=>removeFromTeam(e)} className="removeBtn">Remove From Team</button></>:<button disabled={true} className="disabled">Add to team</button>}</div>
            </div>
        </div>
    )
}
export default Card;