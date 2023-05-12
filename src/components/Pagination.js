import { useSearchParams } from "react-router-dom";

function Pagination(props){
    const [searchParams,setSearchParams]=useSearchParams();
    function onClickHandler(e){
        let pageNum=e.target.innerHTML;
        const newsearchParams = new URLSearchParams(searchParams);
        newsearchParams.set('page',pageNum);
        setSearchParams(newsearchParams);
    }
    return(
        <div className="pagination">
            {
                (()=>{
                    let pageBtns=[];
                    for(let i=1;i<=Math.ceil(props.length/20);i++){
                        pageBtns.push(<button onClick={(e)=>onClickHandler(e)} key={i}>{i}</button>);
                    }
                    return pageBtns;
                })()
            }
        </div>
    )
}
export default Pagination;