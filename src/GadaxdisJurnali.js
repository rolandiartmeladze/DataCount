import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

  const HeadLine = styled.div`
  padding: 3px; 
  padding-right: 0px;
  padding-left: 2%;
  margin-top: 2px;
  width: 98%;
  display: flex;
  flex-direction: column;
  background-color: greenyellow;
  align-items: flex-start;
  
  `;


const ContainerArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;

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
      
      
      const DgeHeadline = styled(DataLine)`
        font-size: 80%;
        background-color: rgba(255, 0, 212, 0.1);
      `;
      
      
      const User = styled.div`width: 100%;`;
      
      
      const Img = styled.img` width: 25px;`;
      
      
      
            
function GadaxdisJurnali({ oneday, activeIndex, datatime, users, history}) {
  
  
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



    console.log(history)
    console.log(oneday)
    


    return(
        <header style={{ padding: "0", flexDirection: "column" }}>

        <Container>
                <ContainerArea>
                    <HeadLine> აქტიური | </HeadLine>

                    <User style={stylesArray['User']}>
                    {history.active ? (
                                        
                                            history.active.map((user) => (
                                                <>

                                                <DataLine
                                                        style={stylesArray['DataLine']}
                                                        >
                                                <Div>
                                                <Img src="./user.png" alt="მომხმარებელი" />
                                                    {user.saxeli}</Div>
                                                <Div>{user.komentari}</Div>
                                                <Div>{'ავანსი'}</Div>
                                                <Div>{'ნაშთი'}</Div>

                                                </DataLine>
                                                
                                                <DgeHeadline style={stylesArray['Dge']}>
                                                {<Div>{user.dro}</Div> }
                                                {<Div></Div> }

                                                {<Div style={{color: 'red'}}>{user.tanxa + "₾"}</Div>}
                                                {
                                                  userDataByUserId[user.id] ? (
                                                    <Div>{userDataByUserId[user.id].saertojami.toFixed(2) } ₾.</Div>
                                                  ) : ( <Div>0 ₾.</Div> )
                                                }                                                
                                                </DgeHeadline>
                                                </>

                                            ))
                                        
                                        ) : (
                                        "not found"
                                        )}  
                                        </User>      
                                    </ContainerArea>

            <ContainerArea>
                    <HeadLine> ისტორია | </HeadLine>
            </ContainerArea>

        </Container>
</header>
    );

}
export default GadaxdisJurnali;