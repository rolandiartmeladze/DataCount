import React, { useState } from 'react';
import FindBlock from './FindBlock';

function TableBlock({ 
  activeIndex, 
  user, 
  users, 
  editUser, 
  newRaodenoba, 
  setNewRaodenoba, 
  searchValue,
  fasi,
  DayInfo,
  status, 
  setStatus,
  oneday
}) {
  const [newFasi, setNewFasi] = useState(fasi[0].yidvisfasi);

  const indeqsi = (user) => {
    const item_id = ["gasayidi_saxeli", "gasayidi_komentari", "gasayidi_raodenoba", "gasayidi_fasi", "gasayidi_id"];
    const user_item = [user.saxeli, user.komentari, user.raodenoba, fasi[0].yidvisfasi, user.id];

    item_id.forEach((item, index) => {
      const element = document.getElementById(item);
      if (element) {
        element.textContent = user_item[index];
      }
    });

    const elementi = document.getElementById('gayiduli_raodenoba');
    const elementi1 = document.getElementById('gasayidi_raodenoba');
    elementi.focus();
    elementi.select();
    elementi.addEventListener('input', () => {
      const elementiValue = elementi.value;
      setNewRaodenoba(elementiValue);
      elementi1.textContent = elementiValue;
    });
  };

  const handleEdit = (user) => {
    setNewFasi(fasi[0].yidvisfasi);
    indeqsi(user);
  };

  const filteredUsers = users.filter((user) => user.raodenoba > 0);


  return (
    <div className="table_container">
      <div className="table">
        <table id="_first_table">
          <tbody id="table_body">
            <tr className="table_header_line">
              {[0, 1, 2].includes(activeIndex) && (
                <>
                  <td>სახელი</td>
                  <td>სოფელი</td>
                  <td>რაოდენობა</td>
                  <td>ფასი</td>
                  <td>ჯამში</td>
                  {activeIndex === 3 && <td>წაშლა</td>}
                  {!(activeIndex === 0 && filteredUsers.length === users.length) && ![1, 2, 3].includes(activeIndex) && <td>აირჩიე</td>}
                </>
              )}
            </tr>
            {[0, 1, 2].includes(activeIndex) && (users
              .filter((user) => user.raodenoba <= 0 && user.saxeli.toLowerCase().includes(searchValue.toLowerCase()) && activeIndex !== 1)
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.saxeli}</td>
                  <td>{user.komentari}</td>
                  <td>{user.raodenoba + " ლ."}</td>
                  <td>{user.fasi + " ₾."}</td>
                  <td>{(user.fasi * user.raodenoba).toFixed(2) + " ₾."}</td>
                  <td>
                    {activeIndex === 0 ? (
                      <button onClick={() => handleEdit(user)}>არჩევა</button>
                    ):null }
                     {activeIndex === 3 ? (
                      <button>წაშლა</button>
                    ) : null}
                  </td>
                </tr>
              )))}
            {activeIndex === 0 && (users
              .filter((user) => user.raodenoba > 0)
              .map((user) => (
                <tr key={user.id} style={activeIndex === 0 ? { backgroundColor: 'rgb(255, 0, 0,0.3)' } : null}>
                  <td>{user.saxeli}</td>
                  <td>{user.komentari}</td>
                  <td>{user.raodenoba + " ლ."}</td>
                  <td>{user.fasi + " ₾."}</td>
                  <td>{(user.fasi * user.raodenoba).toFixed(2) + " ₾."}</td>
                 
                </tr>
              )))}
          </tbody>
        </table>
      </div>
    </div>
  );
    }

export default TableBlock;

