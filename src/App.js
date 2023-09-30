import React, { useState, useEffect, useRef } from "react";
import BuyBlock from "./BuyBlock";
import TableBlock from "./TableBlock";

import "./App.css";
import UserForm from "./UserForm";
import Fasi from "./fasi.json";
import users from "./users.json";
import MyRoom from "./MyRoom";
import DayInfo from "./dayInfo.json";
import updateoneday from "./updateOneDay.json";
import dgisMonacemebi from "./dayInfo.json";
import { Form } from "react-router-dom";
import History from "./History";
import Pay from './Pay';
import GadaxdisJurnali from './GadaxdisJurnali'
const menuItems = [
  "მთავარი",
  "კაბინეტი",
  "დამატება",
  "ჟურნალი",
  "გაცემა",
  "ისტორია",
];
const Title = React.memo(({ activeIndex }) => {
  const firstLetter = menuItems[activeIndex][0];
  const restOfName = menuItems[activeIndex].substring(1);

  return (
    <div className="title">
      <span>{firstLetter}</span>
      {restOfName}
    </div>
  );
});

function useResponsiveNavWidth(isOpen) {
  const [navWidth, setNavWidth] = useState("100%");

  useEffect(() => {
    const updateNavWidth = () => {
      if (window.innerWidth <= 500) {
        setNavWidth(isOpen ? "65%" : "0%");
      } else {
        setNavWidth("100%");
      }
    };

    window.addEventListener("resize", updateNavWidth);
    updateNavWidth();

    return () => {
      window.removeEventListener("resize", updateNavWidth);
    };
  }, [isOpen]);

  return navWidth;
}

const MeniuBtn = ({ toggleMenu }) => {
  const btnRef = useRef(null);
  return (
    <div ref={btnRef} onClick={toggleMenu} className="meniu_btn">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};

const Meniu = React.memo(
  ({ isOpen, activeIndex, setActiveIndex, toggleMenu, menuItems }) => {
    const navWidth = useResponsiveNavWidth(isOpen);

    return (
      <>
        <nav style={{ width: navWidth }}>
          <ul>
            {menuItems.map((item, index) => (
              <li
                className={
                  index === activeIndex ? "li_item meniu_active" : "li_item"
                }
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  toggleMenu();
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  }
);

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [momxmareblebi, setmomxmareblebi] = useState(0);
  const [users, setUsers] = useState([]);
  const [fasi, setFasi] = useState([{}]);
  const [dayInfo, setDay] = useState({});
  const [oneday, setOneDay] = useState({});
  const [history, setHistory] = useState({});

  

  const [newRaodenoba, setNewRaodenoba] = useState("");
  const [FAsi, setFAsi] = useState(fasi[0].yidvisfasi);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const datatime = `${day}/${month}/${year}`;

  const [status, setStatus] = useState("");

        useEffect(() => {
          if (dayInfo.dila) {
            setStatus(true);
          }
        }, [dayInfo.dila]);

  useEffect(() => {
    // _________________
    fetch("/dayInfo.json")
      .then((response) => response.json())
      .then((data) => setDay(data))
      .catch((error) => console.error("Error fetching dayInfo.json:", error));
        // _________________
        fetch("/users.json")
          .then((response) => response.json())
          .then((data) => setUsers(data))
          .catch((error) => console.error("Error fetching users.json:", error));
            // _________________
            fetch("/fasi.json")
              .then((response) => response.json())
              .then((data) => setFasi(data))
              .catch((error) => console.error("Error fetching fasi.json:", error));
                // _________________
                fetch("/updateOneDay.json")
                  .then((response) => response.json())
                  .then((data) => setOneDay(data))
                  .catch((error) =>
                    console.error("Error fetching updateOneDay.json:", error)
                  );

                      // _________________
                      fetch("/gadaxdisIstoria.json")
                      .then((response) => response.json())
                      .then((data) => setHistory(data))
                      .catch((error) => console.error("Error fetching gadaxdisIstoria.json:", error));


  }, []);


  const updateUserOnServer = (updatedUsers) => {
    const updateData = JSON.stringify(updatedUsers);
    fetch("/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: updateData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error updating users:", error);
      });
  };

  const addUser = (newUser) => {
    const updatedUsers = [
      ...users,
      {
        ...newUser,
        id: users.length + 1,
      },
    ];
    setUsers(updatedUsers);
    updateUserOnServer(updatedUsers);
  };

  const BayButton = (newRaodenoba, FAsi) => {
    const ele = parseInt(document.getElementById("gasayidi_id").textContent);
    const updatedUsers = users.map((user) => {
      if (user.id === ele) {
        return { ...user, raodenoba: newRaodenoba, fasi: FAsi };
      }
      return user;
    });
    setUsers(updatedUsers);
    updateUserOnServer(updatedUsers);
  };

  // ***

  const updateUsersInfo = () => {
    const updatedUsers = [];
    users.map((user) => {
      user.raodenoba = "0";
      user.fasi = "0";
      updatedUsers.push(user);
    });
    setUsers(updatedUsers);
    updateUserOnServer(updatedUsers);

    console.log("გადაიტვირთა ძირითადი მონაცემები");
  };




  




// 24H update

    const updateOneDayOnServer = (data) => {
      const updateData = JSON.stringify(data);
      return fetch("/updateOneDay.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: updateData,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData.message);
          console.log("მოხდა მიმდინარე დღის განახლება");
          ganaxlebulia();
          window.location.reload();

        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    };
    
      const performAction = (action) => {
        const randomNumb = Math.random();
        let updatedData;
      
        if (action === "endDay") {
          updatedData = {
            ...oneday,
            [`dge${randomNumb}`]: {
              dila: dayInfo.dila,
              sagamo: dayInfo.sagamo,
            },
          };
        } else if (action === "resetbtn") {
          updatedData = [];
        }
      
        setDay(updatedData);
        updateOneDayOnServer(updatedData);
      };
        
        const endDay = () => {
          const randomNumb = Math.random();
          const produqtisGayidva = {
            ...oneday,
            [`dge${randomNumb}`]: {
              dila: dayInfo.dila,
              sagamo: dayInfo.sagamo,
            },
          };

          setDay(produqtisGayidva);
          updateOneDayOnServer(produqtisGayidva);
        };

    // history reset
    const resetbtn = () =>{
        const  resetDay = [];
            setDay(resetDay);
            updateOneDayOnServer(resetDay);

    }
    // history reset end

// 24H update end



























  const dgeGganaxlda = (dgisganaxleba) => {
    const updateData = JSON.stringify(dgisganaxleba);
    fetch("/updateDay.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: updateData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        if (!DayInfo.sagamo) {
          updateUsersInfo();
        }
        return null;
      })
      .catch((error) => {
        console.error("Error updating users:", error);
      });
  };

  const ganaxlebulia = () => {
    const dgisganaxleba = {};
    // setDay(dgisganaxleba);
    dgeGganaxlda(dgisganaxleba);
  };

  const updateFasiOnServer = async (updatedFasi) => {
    try {
      const updateData = JSON.stringify(updatedFasi);
      const response = await fetch("/fasiEdit.php", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: updateData,
      });

      if (!response.ok) {
        throw new Error("Failed to update fasi on the server");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error updating fasi:", error);
    }
  };

  const fasiButton = () => {
    const yidvisfasi = document.getElementById("yidvisfasi").value;
    const gayidvisfasi = document.getElementById("gayidvisfasi").value;
    const updatedFasi = [
      {
        yidvisfasi: yidvisfasi,
        gayidvisfasi: gayidvisfasi,
      },
    ];

    setFasi(updatedFasi);
    updateFasiOnServer(updatedFasi);

    const fasi1 = document.getElementById("yidvisfasi");
    const fasi2 = document.getElementById("gayidvisfasi");
    fasi1.value = "";
    fasi2.value = "";
  };

  useEffect(() => {
    if (activeIndex === 2) {
      const addUserName = document.getElementsByName("add_name")[0];
      if (addUserName) {
        addUserName.focus();
      }
    }
    const momxmareblebi = users.length;
  }, [activeIndex, momxmareblebi]);

  const toggleMenu = () => {
    const lines = document.querySelectorAll(".line");
    const btnRef = document.querySelectorAll(".meniu_btn");
    if (!isOpen) {
      lines[0].classList.add("line1");
      lines[1].classList.add("line2");
      lines[2].classList.add("line3");
      btnRef[0].classList.add("meniu_btn_active");
    } else {
      lines[0].classList.remove("line1");
      lines[1].classList.remove("line2");
      lines[2].classList.remove("line3");
      btnRef[0].classList.remove("meniu_btn_active");
    }
    setIsOpen(!isOpen);
  };



  return (
    <div>
      <header>
        <Title activeIndex={activeIndex} />
        <Meniu
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          menuItems={menuItems}
        />
        <MeniuBtn toggleMenu={toggleMenu} />
      </header>
      <section>
        {activeIndex === 0 && (
          <BuyBlock
            activeIndex={activeIndex}
            newRaodenoba={newRaodenoba}
            setNewRaodenoba={setNewRaodenoba}
            BayButton={BayButton}
            users={users}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            produqtisfasi={fasi}
          />
        )}
        {activeIndex === 1 && (
          <MyRoom
            // dgisdasruleba={dgisdasruleba}
            status={status}
            setStatus={setStatus}
            endDay={endDay}
            updateUsersInfo={updateUsersInfo}
            axalifasi={fasi}
            fasiButton={fasiButton}
            users={users}
            // handleMyRoomClick={() => heandklick(users, datatime)}
          />
        )}
        {activeIndex === 2 && <UserForm addUser={addUser} axalifasi={fasi} />}
        {activeIndex === 3 && (
          <GadaxdisJurnali
            oneday={oneday}
            addUser={addUser}
            axalifasi={fasi}
            history={history}
          />
        )}
        {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2) && (
          <TableBlock
            // endDay={endDay}

            activeIndex={activeIndex}
            users={users}
            // editUser={editUser}
            newRaodenoba={newRaodenoba}
            setNewRaodenoba={setNewRaodenoba}
            searchValue={searchValue}
            fasi={fasi}
            // searchFocused={searchFocused}
          />
        )}
        {activeIndex === 5 ? (
          <History
            oneday={oneday}
            resetbtn={resetbtn}
            activeIndex={activeIndex}
            fasi={fasi}
          />
        ) : null}
        {activeIndex === 4 ? (
          <Pay
            history={history}
            datatime={datatime}
            oneday={oneday}
            users={users}
            activeIndex={activeIndex}
            fasi={fasi}
          />
        ) : null}
      </section>
    </div>
  );
}

export default App;
