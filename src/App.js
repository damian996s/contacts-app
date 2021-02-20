import "./App.css"
import React, { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState([])
  const [search, setSearch] = useState(null)
  console.log(id)
  const searchSpace=(event)=>{
    let keyword = event.target.value;
    setSearch(keyword);
  }
  function dynamicSort(property) {
    let sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
  }
  items.sort(dynamicSort("last_name"))
  useEffect(() => {
    fetch("https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        }
      )
  }, [])
  const whatToDisplay = items.filter((item) => {
    if (search == null) {
      return item
    }
    else if (item.first_name.toLowerCase().includes(search.toLowerCase()) || item.last_name.toLowerCase().includes(search.toLowerCase())) {
      return item
    }
  }).map(item => {
    return (     
        <ul>     
            <li key={item.id}>
              <label for={item.id}><img src={item.avatar} /></label>
              <label for={item.id} className="check-label">{item.first_name} {item.last_name} </label>
              <input type="checkbox" id={item.id} name={item.id} onClick={() => id.includes(item.id) ? id.pop(item.id) : id.push(item.id)} className="check-input" />
            </li>        
        </ul>
    )
  })
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e)=>searchSpace(e)} className="text-input"/>
      {whatToDisplay}
    </div>
  )
}
        
export default App
