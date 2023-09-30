import React from "react";
import styled, { css } from "styled-components";
import fasi from './fasi.json';

const MOBILE_MAX_WIDTH = 500;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`;

const sharedStyles = css`
  width: 15%;
  height: auto;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: 60%;
  }
`;


const DayHeadline = styled.div`
  width: 100%;
  height: auto;
  padding: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(255, 0, 212, 0.5);
`;

const Div = styled.div`
  ${sharedStyles}
`;
const Dge = styled.div`
width: 100%

`
const DataLine = styled.div`
  box-shadow: 0 0.2px 0.5px 0.2px rgba(0, 0, 0, 0.6);
  margin: 1px;
  width: 100%;
  height: auto;
  padding: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const DataItem = styled.div`
  width: 15%;
  ${sharedStyles}

`;

const Dila = styled.div`
  width: 100%;
  padding: 0px;
  overflow: hidden;
  background-color: rgb(228, 253, 4, 0.1);

`;

const DilaHeadline = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(228, 253, 4, 0.3);
`;

const SagamoHeadline = styled.div`
  height: 35px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(10, 66, 73, 0.3);
`;

const Sagamo = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 0px;
  background-color: rgba(10, 66, 73, 0.1);
`;

const ContainerHeader = styled.div`
  padding: 0px;
  margin-bottom: 0px;
  padding-bottom: 3px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.2px 0.5px 0.2px rgba(0, 0, 0, 0.6);
`;

const Img = styled.img`
  width: ${(props) => (props.isMobile ? "15px" : "25px")};
  margin-right: ${(props) => (props.isMobile ? "3px" : "5px")};
`;



function renderSectionData(sectionData) {
  return sectionData.slice(1).map((user, userIndex) => (
    <DataLine key={userIndex}>
      <DataItem>{sectionData[0].datatime}</DataItem>
      <DataItem>{user.saxeli}</DataItem>
      <DataItem>{user.komentari}</DataItem>
      <DataItem>{user.raodenoba} ლ.</DataItem>
      <DataItem>{user.fasi}</DataItem>
      <DataItem>{(user.fasi * user.raodenoba).toFixed(2) + " ₾."}</DataItem>
    </DataLine>
  ));
}

function History({ oneday, activeIndex , resetbtn, fasi}) {
  const reset = () => {

    resetbtn();

console.log("update")
  }

  const isMobile = window.innerWidth <= 500 
  if (activeIndex === 5 && typeof oneday === "object") {
    return (
      <div>
        <header style={{ padding: "0px", flexDirection: "column" }}>
          <Container>
            <ContainerHeader>
              <DataItem>დრო</DataItem>
              <DataItem>სახელი</DataItem>
              <DataItem>სოფელი</DataItem>
              <DataItem>რაოდენობა</DataItem>
              <DataItem>ფასი</DataItem>
              <DataItem>ჯამში</DataItem>
            </ContainerHeader>

            {Object.keys(oneday).map((key, index) => {
              
              let fasiDila = 0;
              let fasiSagamo = 0;
              let jamiDila = 0;
              let jamiSagamo = 0;

              if (oneday[key].dila) {
                oneday[key].dila.slice(1).forEach((user) => {
                  jamiDila += parseInt(user.raodenoba);
                  fasiDila += parseInt(user.raodenoba * user.fasi);
                });
              }

              if (oneday[key].sagamo) {
                oneday[key].sagamo.slice(1).forEach((user) => {
                  jamiSagamo += parseInt(user.raodenoba);
                  fasiSagamo += parseInt(user.raodenoba * user.fasi);
                });
              }

              return (
                <Dge key={index}>
                  <DayHeadline>
                    <Div>
                      <Img isMobile={isMobile} src="./day.png" alt="დღე" />
                      {"დღე:" + (index + 1)}
                    </Div>

                    <Div>{oneday[key].dila && oneday[key].dila[0].datatime}</Div>
                    <Div>{oneday[key].sagamo && oneday[key].sagamo[0].datatime}</Div>
                    <Div>{(jamiDila + jamiSagamo).toFixed(2) + " ლ."}</Div>
                    <Div></Div>
                    <Div>{(fasiDila + fasiSagamo).toFixed(2) + " ₾."}</Div>
                  </DayHeadline>

                  <Dila>
                    <DilaHeadline>
                      <Div>
                        <Img isMobile={isMobile} src="./sun.png" alt="დილა" />
                        დილა
                      </Div>

                      <Div>{oneday[key].dila && oneday[key].dila[0].datatime}</Div>
                      <Div></Div>
                      <Div>{(jamiDila).toFixed(2) + " ლ."}</Div>
                      <Div></Div>
                      <Div>{(fasiDila).toFixed(2) + " ₾."}</Div>
                    </DilaHeadline>

                    {oneday[key].dila ? renderSectionData(oneday[key].dila) : null}
                  </Dila>

                  <Sagamo>
                    <SagamoHeadline>
                      <Div>
                        <Img isMobile={isMobile} src="./moon.png" alt="საღამო" />
                        საღამო
                      </Div>

                      <Div></Div>
                      <Div>{oneday[key].sagamo && oneday[key].sagamo[0].datatime}</Div>
                      <Div>{(jamiSagamo).toFixed(2) + " ₾."}</Div>
                      <Div></Div>
                      <Div>{(fasiSagamo).toFixed(2) + " ₾."}</Div>
                    </SagamoHeadline>

                    {oneday[key].sagamo ? renderSectionData(oneday[key].sagamo) : null}
                  </Sagamo>
                </Dge>
              );
            })}
          </Container>

          <button onClick={reset}>გადატვირთვა</button>
        </header>
      </div>
    );
  }
  return null;
}

export default History;
