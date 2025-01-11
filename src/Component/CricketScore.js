import React, { useEffect, useState } from "react";
import circle from "./circle.png";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState();
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=e4f18829-fd6c-4ce4-8090-e1f8f5c8638c");
      const data = await response.json();
      console.log(data);
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value);
    setInputData(e.target.value);
  };

  const handleBtn = () => {
    setSearch(inputData);
    getData();
  };

  // Helper function to perform case-insensitive string comparison
  const caseInsensitiveIncludes = (str, searchTerm) => {
    return str.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="main-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search country, state or series"
          onChange={handleInput}
        />
        <button onClick={handleBtn}>Search</button>
      </div>
      <div className="heading">
        <img src={circle} />
        <p>Live Cricket Score App</p>
      </div>

      <div className="container">
        {data ? (
          data.map((curVal) => {
            console.log(curVal);
            if (curVal.status != "Match not started") {
              if (
                caseInsensitiveIncludes(curVal.series, search) || 
                caseInsensitiveIncludes(curVal.t1, search) || 
                caseInsensitiveIncludes(curVal.t2, search)
              ) {
                return (
                  <div className="card">
                    <h3>{curVal.series}</h3>
                    <h3>{curVal.matchType}</h3>
                    <div className="img">
                      <div>
                        <img src={curVal.t1img} />
                        <p>{curVal.t1}</p>
                        <p>{curVal.t1s}</p>
                      </div>
                      <div>
                        <img src={curVal.t2img} />
                        <p>{curVal.t2}</p>
                        <p>{curVal.t2s}</p>
                      </div>
                    </div>
                    <p className="status">Status : {curVal.status}</p>
                  </div>
                );
              }

              if(search === ""){
                return (
                  <div className="card">
                    <h3>{curVal.series}</h3>
                    <h3>{curVal.matchType}</h3>
                    <div className="img">
                      <div>
                        <img src={curVal.t1img} />
                        <p>{curVal.t1}</p>
                        <p>{curVal.t1s}</p>
                      </div>
                      <div>
                        <img src={curVal.t2img} />
                        <p>{curVal.t2}</p>
                        <p>{curVal.t2s}</p>
                      </div>
                    </div>
                    <p className="status">Status : {curVal.status}</p>
                  </div>
                );
              }
            }
            return null;
          })
        ) : (
          <p>Data Not Found !</p>
        )}
      </div>
    </div>
  );
};

export default CricketScore;