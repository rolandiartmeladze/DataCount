import React, { useEffect, useState, useRef } from "react";
import FindBlock from "./FindBlock";
import fasi from './fasi.json';
function BuyBlock({
  activeIndex,
  user,
  users,
  editUser,
  newRaodenoba,
  BayButton,
  searchValue,
  setSearchValue,
  onSearchChange,
  produqtisfasi
}) {
  const item_id = [
    "gasayidi_saxeli",
    "gasayidi_komentari",
    "gasayidi_raodenoba",
    "gasayidi_fasi",
    "gasayidi_id",
  ];
  const text_contentHead = [
    "სახელი:",
    "სოფელი:",
    "რაოდენობა:",
    "ფასი:",
    "user_ID",
  ];

  const indeqsioff = (user) => {
    const item_id = [
      "gasayidi_saxeli",
      "gasayidi_komentari",
      "gasayidi_raodenoba",
      "gasayidi_fasi",
      "gasayidi_id",
    ];
    item_id.forEach((item) => {
      document.getElementById(item).textContent = "";
    });
    const elementi = document.getElementById("gayiduli_raodenoba");
    elementi.blur();
    elementi.value = "";
  };






  const handleClick = () => {  
    if(produqtisfasi[0].yidvisfasi){
          BayButton(newRaodenoba, produqtisfasi[0].yidvisfasi);
    }
    else{
      BayButton(newRaodenoba, 0);
    }
    indeqsioff();

    console.log(fasi)
  };
  
  const number = [];
  const saertonashti = [];

  users.forEach((element) => {
    if (element.raodenoba > 0) {
      number.push(element.raodenoba);
      saertonashti.push(element.raodenoba * element.fasi);
    }
  });

  let sum = 0;
  let jami =0;
  number.forEach((item) => {
    sum += parseInt(item);
  });
  

  saertonashti.forEach((item) => {
    jami += parseInt(item);
  });

  // let jami = sum * fasi[0].yidvisfasi;
    const sumString = jami.toString();

    // console.log(fasi)
  
  return (
    <div>
      <>
        <div className="find_result">
          <h4>

          <div>
            დღეს: <samp style={{ color: "red" }}>{sum} ლიტ.</samp>
          </div>

            <div>
              დღეს: <samp style={{ color: "red" }}>{sumString.slice(0, 7)} ₾.</samp>
            </div>
          </h4>

          <FindBlock
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>
      </>{" "}
      <article className="gasayidi_producti">
        
        <div id="info_line" className="info_line">
          <div className="users_line">
            <div className="momxmareblebi">
              სულ:
              <samp style={{ color: "red" }}>{users.length} </samp>
              <samp>/</samp>
              <samp style={{ color: "green" }}>
                {users.filter((shedegi) => shedegi.raodenoba > 0).length}
              </samp>
            </div>
            <progress
              id="day_result"
              className="day_result"
              value={users.filter((shedegi) => shedegi.raodenoba > 0).length}
              max={users.length}
            ></progress>
          </div>
        </div>

        <table className="gasayidi_inf">
          <tbody>
            <tr>
              {item_id.map((id, index) => (
                <td key={index}>
                  <div className="text">{text_contentHead[index]}</div>
                  <samp id={id}></samp>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className="gasayidi_btn">
          <input
            id="gayiduli_raodenoba"
            className="inner_input"
            type="number"
            placeholder="რაოდენობა"
          />
          <div id="produqtis_gayidva" className="button" onClick={handleClick}>
            ჩავიბარე
          </div>
        </div>

      </article>
    </div>
  );
}

export default BuyBlock;
