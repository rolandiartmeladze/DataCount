/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fasi from "./fasi.json";
import axios from 'axios'; 

const MOBILE_MAX_WIDTH = 500;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  width: 15%;
  height: auto;
  padding: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
  justify-content: flex-start;
  padding-left: 5px; /* Corrected the typo here */
`;

const DataLine = styled.div`
  box-shadow: 0 0.2px 0.5px 0.2px rgba(0, 0, 0, 0.6);
  margin: 0px;
  width: 100%;
  height: auto;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: ${(props) => props.fontSize};
`;

const InfoLine = styled(DataLine)`
  font-size: 70%;
  box-shadow: 0 0.2px 0.5px 0.2px rgba(0, 120, 0, 0.6);
`;

const DataItem = styled.div` width: 15%;`;

const DgeHeadline = styled(DataLine)`
  font-size: 80%;
  background-color: rgba(255, 0, 212, 0.1);
`;

const Dge = styled.div` width: 100%;`;

const User = styled.div`width: 100%;`;

const ContainerHeader = styled.div`
  padding: 0px;
  margin-bottom: 0px;
  padding-bottom: 3px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: ${(props) => props.fontSize};
`;

const Img = styled.img` width: 25px;`;

const Img1 = styled.img`
  width: 15px;
  margin-right: 5px;
  margin-left: 10px;
`;

const Img2 = styled.img`
  width: 20px;
  margin-right: 5px;
`;

const PayButton = styled.button`
  display: none;
  max-height: 100%;
  position: absolute;
  background-color: rgb(0, 123, 255);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 0px;
  padding: 6px 8px;
  font-size: 70%;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s, background-color 0.3s ease 0s,
    box-shadow 0.3s ease 0s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  &:active {
    background-color: #003a75;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  }
`;

const UserPayLine = styled.div`
  overflow: hidden;
  height: 0px;
  display: flex;
  flex-direction: row;
  font-size: 70%;
  box-shadow: 0 0.2px 0.5px 0.2px rgba(0, 120, 0, 0.6);
  transition: 0.4s ease-in-out;
  font-size: ${(props) => props.fontSize};

`;

const UserPayInput = styled.input`
  height: 98%;
  max-width: 90%;
  border: none;
  outline: none;
  text-align: center;
  background: linear-gradient(
    to right,
    rgba(36, 189, 100, 0.1) 0%,
    rgba(36, 189, 100, 1) 50%,
    rgba(36, 189, 100, 0.1) 100%
  );
  color: red;
  &::placeholder {
    color: yellow;
  }
`;


const stylesArray = {
  arrowBtn: {
    height: '100%',
    right: window.innerWidth > 500 ? '10px' : '0px',
    float: 'right',
    padding: '8px',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
          },

          User: {
                backgroundColor: "rgba(228, 253, 4, 0.2)",
                marginBottom: "5px",
                marginTop: "3px",
                borderRadius: "0",
                borderTop: "2px solid rgba(51, 51, 51, 0.6)",
                borderBottom: "1px solid rgba(51, 51, 51, 0.3)",
                overflow: "hidden",
              },

              DataLine:{
                backgroundColor: "rgba(51, 31, 51, 0.6)",
                color: "white",
                      },

                      DivGadaxda:{
                        background: "linear-gradient(to right, rgba(255, 0, 0, 0.4) 0%, transparent 100%)",
                                },

                                DivArrowwBtn:{
                                  justifyContent: "space-between",
                                            },

                                            Dge:{
                                              backgroundColor: "rgba(51, 51, 51, 0.2)",
                                              },

                                              DgeDila:{
                                                backgroundColor: "rgba(228, 253, 4, 0.3)",
                                                    },

                                                    DgeSagamo:{
                                                      backgroundColor: "rgba(10, 66, 73, 0.3)",
                                                      marginBottom: "3px",
                                                            },

                                                            DivBayBtn:{
                                                              justifyContent: "center",
                                                              padding: "0px",
                                                                    },

                                                                    BayBtn:{ 
                                                                      margin: "0px", 
                                                                      padding: '7.5px',
                                                                      right: window.innerWidth > 500 ? "10px" : "0px", 
                                                                            }


};

function Pay({ oneday, activeIndex, datatime, users, history}) {
  const [fontSize, setFontSize] = useState("100%");

  useEffect(() => {
    function updateStyles() {
      if (window.innerWidth <= MOBILE_MAX_WIDTH) {
        setFontSize("60%");
      } else {
        setFontSize("100%");
      }
    }

    updateStyles();

    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("resize", updateStyles);
    };
  }, []);


  if (activeIndex === 4 && typeof oneday === "object") {
    const uniqueUserIds = Object.values(oneday).reduce((acc, dayData) => {
      const addUserIds = (users) => {
        users.forEach((user) => {
          if (!acc.includes(user.id)) {
            acc.push(user.id);
          }
        });
      };

      addUserIds(dayData.dila);
      addUserIds(dayData.sagamo);

      return acc;
    }, []);

    const userDataByUserId = {};

    uniqueUserIds.slice(1, uniqueUserIds.length).forEach((userId) => {
      userDataByUserId[userId] = {
        saxeli: null,
        komentari: null,
        raodenoba: 0,
        fasi: 0,
        jami: 0,
        saertoRaodenoba: 0,
        saertojami: 0,
        mimdinareNashti: 0,
      };

      Object.values(oneday).forEach((dayData) => {
        const dilaUser = dayData.dila.find((user) => user.id === userId);
        const sagamoUser = dayData.sagamo.find((user) => user.id === userId);

        if (dilaUser) {
          userDataByUserId[userId].saxeli = dilaUser.saxeli;
          userDataByUserId[userId].komentari = dilaUser.komentari;
          userDataByUserId[userId].raodenoba += parseInt(dilaUser.raodenoba);
          userDataByUserId[userId].fasi += parseInt(dilaUser.fasi);
          userDataByUserId[userId].jami += dilaUser.raodenoba * dilaUser.fasi;
        } else if (sagamoUser) {
          userDataByUserId[userId].saxeli = sagamoUser.saxeli;
          userDataByUserId[userId].komentari = sagamoUser.komentari;
          userDataByUserId[userId].raodenoba += parseInt(sagamoUser.raodenoba);
          userDataByUserId[userId].fasi += parseInt(sagamoUser.fasi);
          userDataByUserId[userId].jami +=
            sagamoUser.raodenoba * sagamoUser.fasi;
        }

        userDataByUserId[userId].saertoRaodenoba +=
          (dilaUser ? parseInt(dilaUser.raodenoba) : 0) +
          (sagamoUser ? parseInt(sagamoUser.raodenoba) : 0);

        userDataByUserId[userId].saertojami +=
          (dilaUser ? dilaUser.raodenoba * dilaUser.fasi : 0) +
          (sagamoUser ? sagamoUser.raodenoba * sagamoUser.fasi : 0);


          userDataByUserId[userId].mimdinareNashti = history.active.find(id => id.id === userId)
          ? `${userDataByUserId[userId].saertojami - history.active.find(id => id.id === userId).tanxa}`
          : `${userDataByUserId[userId].saertojami}`;


      });



    });


    
    const toggleGadaxda = (event) => {
      const userId = event.target.id.replace("btnActive", "");
      const Ids = uniqueUserIds.slice(1, uniqueUserIds.length);

      Ids.forEach((id) => {
        const buttonElement = document.getElementById(`btnActive${id}`);
        const userPayLine = document.getElementById(`PayLine${id}`);
        const userPayBtn = document.getElementById(`${id}`);
        const UserPayInput = document.getElementById(`PayInput${id}`);

        if (buttonElement) {
          buttonElement.style.transform = "rotate(0deg)";
          buttonElement.style.borderRadius = "50%";
          userPayLine.style.height = "0px";
          userPayLine.style.overflow = "hidden";
          userPayBtn.style.display = "none";
          UserPayInput.blur();
          UserPayInput.value = '';
        }
      });

              const buttonElementActive = document.getElementById(`btnActive${userId}`);
              const userPayLineActive = document.getElementById(`PayLine${userId}`);
              const userPayBtnActive = document.getElementById(`${userId}`);
			  const UserPayInputActive = document.getElementById(`PayInput${userId}`);

              if (buttonElementActive) {
                buttonElementActive.style.transform = "rotate(90deg)";
                buttonElementActive.style.borderRadius = "50% 0% 0% 50%";

                userPayLineActive.style.height = "25px";
                userPayLineActive.style.overflow = "hidden";
                setTimeout(() => {
                  userPayBtnActive.style.display = "flex";
                }, 350);
				UserPayInputActive.focus();

              }
    };

    const payBtn = async (event) => {
      const userId = event.target.id;
      const input = document.getElementById(`PayInput${userId}`);
    
      if (input.value > 0) {
        const user = users.find((user) => user.id === Number(userId));
    
        if (user) {
          const activeUser = {
            id: user.id,
            saxeli: user.saxeli,
            komentari: user.komentari,
            dro: datatime,
            tanxa: input.value,
          };
    
          try {
            const url = './addGadaxdisIstoria.php'; 
            const response = await axios.post(url, activeUser);
    
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);
            console.log('Response Headers:', response.headers);
    
            window.location.reload();
          } catch (error) {
            console.error('Error:', error);
          }
        }
      }
    };
    

      
        return (
      <div>
        <header style={{ padding: "0", flexDirection: "column" }}>
          <Container>
            <ContainerHeader fontSize={fontSize}>
              <DataItem>სახელი</DataItem>
              <DataItem>სოფელი</DataItem>
              <DataItem>რაოდენობა</DataItem>
              <DataItem>ფასი</DataItem>
              <DataItem>ჯამში</DataItem>
            </ContainerHeader>

            {uniqueUserIds.slice(1, uniqueUserIds.length).map((userId) => (

              <User style={stylesArray['User']} key={userId} >

                <DataLine
                  style={stylesArray['DataLine']}
                  fontSize={fontSize}
                >
                  <Div>
                    <Img src="./user.png" alt="მომხმარებელი" />
                    {userDataByUserId[userId].saxeli}
                  </Div>
                  <Div> {userDataByUserId[userId].komentari}                           </Div>
                  <Div> {`${userDataByUserId[userId].saertoRaodenoba.toFixed(2)} ლ.`} </Div>
                  <Div style={{color:'rgb(0, 255, 0)'}}> 
                  {history.active.map(id => ( id.id === userId ? id.tanxa + '₾.': null ))}                                                                     
                   </Div>

                   <Div style={
                    { ...stylesArray['DivArrowwBtn'], 
                   color: userDataByUserId[userId].mimdinareNashti < 0 ? 'rgb(255, 255, 0)' : 'white' }}
                   >
                              {userDataByUserId[userId].mimdinareNashti.slice(0, 6) + "₾."}
                                <PayButton
                                style={stylesArray['arrowBtn']}
                                key={`btnActive${userId}`}
                                id={`btnActive${userId}`}
                                onClick={toggleGadaxda}
                              >
                                {"=>"}
                              </PayButton>
                            </Div>

                </DataLine>

                <UserPayLine id={`PayLine${userId}`} fontSize={fontSize}>

                  <Div style={stylesArray['DivGadaxda']} > გადახდა </Div>
                  <Div>{datatime}</Div>
                  <Div>ნაშთი</Div>
                  <Div>
                    <UserPayInput
                      placeholder="0 ₾."
                      type="number"
                      id={`PayInput${userId}`}
                    ></UserPayInput>
                  </Div>

                  <Div style={stylesArray['DivBayBtn']}>
                    <PayButton style={stylesArray['BayBtn']}
                    onClick={payBtn}
                    id={`${userId}`}> გადახდა </PayButton>
                  </Div>

                </UserPayLine>

                {Object.keys(oneday).map((key, index) => (
                  <React.Fragment key={key}>

                    <Dge>

                      <DgeHeadline style={stylesArray['Dge']}
                        fontSize={fontSize}
                      >
                        <Div style={{ fontSize: "70%" }}>
                          <Img2 src="./day.png" alt="დღე" />{" "}
                          {`დღე ${index + 1}`}
                        </Div>
                        <Div></Div>
                        <Div></Div>
                        <Div></Div>
                        <Div></Div>
                      </DgeHeadline>

                          <InfoLine style={stylesArray['DgeDila']} >
                            <Div>
                              <Img1 src="./sun.png" alt="დილა" /> დილა
                            </Div>
                            <Div>{oneday[key].dila[0].datatime}</Div>
                            <Div>
                              {oneday[key].dila
                                .slice(1)
                                .filter((user) => user.id === userId)
                                .map((user) => (
                                  <span
                                    key={user.id}
                                  >{`${user.raodenoba} ლ.`}</span>
                                ))}
                            </Div>
                            <Div>
                              {oneday[key].dila
                                .slice(1)
                                .filter((user) => user.id === userId)
                                .map((user) => `${user.fasi} ₾.`)}
                            </Div>
                            <Div>
                              {oneday[key].dila
                                .slice(1)
                                .filter((user) => user.id === userId)
                                .map(
                                  (user) =>
                                    `${(user.raodenoba * user.fasi).toFixed(2)} ₾.`
                                )}
                            </Div>
                          </InfoLine>

                              <InfoLine style={stylesArray['DgeSagamo']} >
                                <Div>
                                  <Img1 src="moon.png" alt="საგამო" />
                                  საღამო
                                </Div>

                                <Div>{oneday[key].sagamo[0].datatime}</Div>
                                <Div>
                                  {oneday[key].sagamo
                                    .slice(1)
                                    .filter((user) => user.id === userId)
                                    .map((user) => (
                                      <span
                                        key={user.id}
                                      >{`${user.raodenoba} ლ.`}</span>
                                    ))}
                                </Div>
                                <Div>
                                  {oneday[key].sagamo
                                    .slice(1)
                                    .filter((user) => user.id === userId)
                                    .map((user) => `${user.fasi} ₾.`)}
                                </Div>
                                <Div>
                                  {oneday[key].sagamo
                                    .slice(1)
                                    .filter((user) => user.id === userId)
                                    .map(
                                      (user) =>
                                        `${(user.raodenoba * user.fasi).toFixed(2)} ₾.`
                                    )}
                                </Div>
                              </InfoLine>

                    </Dge>
                  </React.Fragment>
                ))}
              </User>
            ))}
          </Container>
        </header>
      </div>
    );
  }

  return null;
}

export default Pay;
