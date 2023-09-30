import React, { useState , useEffect} from 'react';
import Fasi from './fasi.json';
import dayInfo from './dayInfo.json';
import daysinfo from './updateOneDay.json';
import styled from "styled-components";
const MOBILE_MAX_WIDTH = 500;

function MyRoom({
  setStatus, 
  status, 
  setActiveIndex,
  updateUsersInfo,
  users, 
  activeIndex, 
  fasi, 
  fasiButton , 
  axalifasi , 
  handleMyRoomClick ,
  filteredUsers,
  endDay,
  setStatussagamo,
  statussagamo
}) {

  const [DayInfo, setDayInfo] = useState({});
  const [day, setDay] = useState({});
  const [isShedegiMode, setIsShedegiMode] = useState(true);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const dge = currentDate.getDate();
  const datatime = `${dge}/${month}/${year}`;



  const EndDayBtn = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 20px;
  cursor:pointer;
`;



  const updateFasi = () => { 
    fasiButton(); 
  };


  useEffect(() => {
    fetch("/dayInfo.json")
      .then((response) => response.json())
      .then((data) => setDayInfo(data))
      .catch((error) => console.error("Error fetching dayInfo.json:", error));

      //... 
      fetch("/updateOneDay.json")
      .then((response) => response.json())
      .then((data) => setDay(data))
      .catch((error) => console.error("Error fetching updateOneDay.json:", error));      
  
  }, []); 


  const updateDayInfoOnServer = (updatedDay) => {
    const updateData = JSON.stringify(updatedDay);
    fetch("/updateDay.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: updateData,
    })
      .then((response) => response.json())
      .then((data) => {
            console.log(data.message);
            if(!DayInfo.sagamo){ updateUsersInfo(); }
              return null        
      })
      .catch((error) => {
        console.error("Error updating users:", error);
      });


  };


  const gadatvirtva = () =>{
    let updateDay = DayInfo;
    setDayInfo(updateDay);
    setTimeout(() => { endDay(); }, 2000);
  }


  const heandklick = () => { 
    const filteredUsers = users.filter((user) => user.raodenoba > 0);
    let updateDay = { ...DayInfo};  
    if (!DayInfo.dila) {
      updateDay.dila = [{ datatime: datatime }, ...filteredUsers];
      setStatus(true)
      setDayInfo(updateDay);
      updateDayInfoOnServer(updateDay);
    } 
    else if (DayInfo.dila && !DayInfo.sagamo) {
      updateDay.sagamo = [{ datatime: datatime }, ...filteredUsers];
      setDayInfo(updateDay);
      updateDayInfoOnServer(updateDay);
      window.location.reload();
    }
  };

  const switchToShedegi = () => {setIsShedegiMode(true);};
  const switchToFasi = () => {setIsShedegiMode(false);};

  const number = [];
  let sum = 0;

  users.forEach((element) => { 
    if (element.raodenoba > 0) { 
    number.push(element.raodenoba); } 
  });
  number.forEach((item) => {
     sum += parseInt(item); 
    });

  const jami = sum * axalifasi[0].gayidvisfasi
  const sumString = jami.toString();

  const clickDila =   ()=>{ setStatus(false); }
  const clickSagamo = ()=>{ setStatus(true); }

       
  return (
    <article className="main_header">

      <div  
      className={isShedegiMode ? "fasi " : "fasi active"}
      >
        <div>
          <header>
            <div>მიმდინარე ფასი</div>
          </header>
          <div style={{
            display:'flex', 
            padding: '5px', 
            justifyContent: 'space-around',
            color: 'white'
            }}>
              <div>
              ყიდვა: {" "}{axalifasi[0].yidvisfasi }
              </div>
              
                <div>
                გაყიდვა: {" "}{axalifasi[0].gayidvisfasi }
                </div>
          </div>

            <header>
            <div>ახალი ფასი</div>
          </header>
          <div style={{display:'flex', margin: '3px'}}>
              <div 
              style={{width:'25%'}}
              >ყიდვა:</div> 
              <input  
              className='fasi_input'
              type='number' 
              placeholder='შეიყვანე ფასი'
              id='yidvisfasi'
              ></input>
            </div>
            <div 
            style={{display:'flex', margin:'3px'}}>
            <div 
            style={{width:'25%'}}
            >გაყიდვა:</div> 
            <input 
            className='fasi_input'
            type='number' 
            placeholder='შეიყვანე ფასი'
            id='gayidvisfasi'

            ></input>
            </div>
        </div>

      </div>

      <div 
      className={isShedegiMode ? "shedegi active" : "shedegi "}
      >
      
          <header>
            <img  
            src="./data.png" 
            alt="Find Icon" 
            style={{ width: '25px', marginRight:'10px'}
            } 
            />
            
            <div 
              style={{
                color:'rgba(10, 10, 10, 0.8)' , 
                fontWeight: 'bolder' 
              }}
            >
              {datatime}
            </div>

            <div
              style={{
                textDecoration:'underline', 
                fontWeight:'bolder' , 
                color: 'red', 
                position: 'absolute', 
                right:'10px'
              }}
            >
              {axalifasi[0].gayidvisfasi} ₾.
            </div>

            </header>
            
            <section>
              
                <div onClick={clickDila}  className={!status ? "main_btn main_btn_active" :" main_btn"}>დილა</div>        
                <div  onClick={clickSagamo} className={status && !DayInfo.sagamo? "main_btn main_btn_active" :" main_btn"}>საღამო</div>

            </section>

            <div className="items_cont">
              {DayInfo.dila && DayInfo.sagamo ? (
                <EndDayBtn  onClick={gadatvirtva} >გადატვირთვა</EndDayBtn>
              ) : (
                <>
                  <div>
                    <div className="result_item">რაოდენობა</div>
                    <div className="result">{sum} ლ.</div>
                  </div>
                  <div>
                    <div className="result_item">ღირებულება</div>
                    <div className="result">{sumString.slice(0, 7)} ₾.</div>
                  </div>
                </>
              )}
            </div>

      </div>

          <ul className="main_meniu">

            <button
              onClick={switchToShedegi}
              className={isShedegiMode ? "main_meniu_active" : ""}
            >
              შედეგი
            </button>
{
  isShedegiMode ? 
  <button
    onClick={switchToFasi}
    className={""}
  > 
  ფასები
  </button>
    :(  
    <button
      onClick={updateFasi}
      className={"main_meniu_active"}
      style={window.innerWidth <= 500 ? { fontSize: '70%' } : { fontSize: '100%' }}
    > 
    შეცვალე ახლა
    </button>
  )
}

{isShedegiMode ? (
  <button 
    className='chabareba' 
    onClick={heandklick}
  >
    ჩაბარება
  </button>
): (null)}



          </ul>
    </article>

  );
}

export default MyRoom;
