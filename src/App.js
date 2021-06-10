import logo from './logo.svg';
import React, { Component,PureComponent, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';




const Parent = () => {
  const [buttons , setButtons] = useState([]);
  const [btnClick , setBtnClick] = useState(null);
  const [cards,updateCards] = useState([]);
  const [searchValue,setSearchValue] = useState('')
  const [orginalData,setOrginalData]=useState([])
  useEffect(()=>{
     console.log('component did mount')
    //  fetch('https://jsonplaceholder.typicode.com/photos')
    //  .then(response => response.json())
    axios.get('https://api.edyoda.com/v1/blog/postcategories/')
  .then(json => {
    setButtons(json.data)
  })

  axios.get('https://api.edyoda.com/v1/blog/')
  .then(blog => {
    setOrginalData(blog.data)
    updateCards(blog.data)
  })},[])
  
  // const postData=()=>{
  //    axios({
  //      method:"delete",
  //      url:"https://jsonplaceholder.typicode.com/posts/1",
  //     //  data:{
  //     //   userId: 1,
  //     //   id: 1,
  //     //   title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //     //   body: "body"
  //     //  }
  //    }).then(res=> console.log(res))
  // }

  const onSearch = ()=>{
    const updateValues = orginalData.filter((item)=>
    item.authorname.toLowerCase().includes(searchValue.toLowerCase())||item.slug.toLowerCase().includes(searchValue.toLowerCase()))
    updateCards(updateValues)
    
  }
  
  useEffect(()=>{
    console.log('component did update') 
  })
  const btncards=(id)=>{
    setBtnClick(id)
    const btnOnClick = orginalData.filter((item)=>item.id == id)
    updateCards(btnOnClick);
  }
  return (<div>
    <input type="search" placeholder="search.." id="search-box" onBlur={(e)=>e.target.value=''} onChange={(e)=>setSearchValue(e.target.value)}/><button onClick={onSearch}>search</button>
    <div>
      {/* <button onClick={()=>postData()}>on hit</button> */}
    {buttons.map((item)=>
      <div className={btnClick === item.id ? "buttons active":"buttons"} onClick={()=>{btncards(item.id)}} key={item.id}>{item.title}</div>)}</div>
     <div className="cardWrap">
      { cards.map(({authorname,description,id,slug,small_image,title})=>
      <div className="card">
        <img src={small_image}/>
        <h5>{title}</h5>
        <p>{authorname}</p>
        <p>{description}</p>
      </div>
      
      )}</div>
    
    </div>
    );
  }
 
export default Parent;

// const Child = ({count}) => {
//   const [childCount,updateChildCount] = useState(count)
//   useEffect(()=>{
//     if(count <=5)
//     updateChildCount(count)
//   },[count])
  
//   return (<div>
//     <h2>Child - {childCount}</h2>
//   </div>  );
// }
 

  






