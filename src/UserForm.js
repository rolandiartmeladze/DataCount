import React, { useState, useEffect } from "react";
import Fasi from "./fasi.json";

function UserForm({ addUser ,axalifasi }) {

  const [saxeli, setSaxeli] = useState("");
  const [komentari, setKomentari] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

// gasatestia
  const [isFasi, setisFasi] = useState(Fasi[0].yidvisfasi);
// end

  const  fasi = 0;
  const raodenoba = 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saxeli && komentari) {
      addUser({ saxeli, komentari, raodenoba, fasi });
      setSaxeli("");
      setKomentari("");

      const addUserName = document.getElementsByName("add_name")[0];
      if (addUserName) {
        addUserName.focus();
      }
    }
  };

  // console.log(axalifasi)

  const styles = [
    {
      sampStyle: {
        padding: "10px",
        fontSize: "100%",
        width: "100%",
        textAlign: "left",
        fontWeight: "bolder",
      },
    },
  ];

  // console.log(fasi)
  return (
    <div>
      <h2>მომხმარებლის დამატება</h2>

      <article className="gasayidi_producti">
        <form className="add_form" onSubmit={handleSubmit}>
          <div className="item">
            <input
              name="add_name"
              type="text"
              placeholder="სახელი"
              value={saxeli}
              onChange={(event) => setSaxeli(event.target.value)}
            />
          </div>

          <div className="item">
            <input
              placeholder="კომენტარი"
              type="text"
              value={komentari}
              onChange={(event) => setKomentari(event.target.value)}
            />
          </div>

          <div className="item">
            <samp style={styles[0].sampStyle}>{"რაოდენობა 0 ლ."}</samp>
          </div>

          <div className="item">
            <samp style={styles[0].sampStyle}>ფასი{" "}{ axalifasi[0].yidvisfasi ? (axalifasi[0].yidvisfasi):(0) 
            + " ₾."}
            
            </samp>
          </div>

          <button type="submit" className="button add_btn_">
            {" "} დამატება {" "}
          </button>
        </form>
      </article>
    </div>
  );
}

export default UserForm;
