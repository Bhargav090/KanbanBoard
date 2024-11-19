import React from "react";
import "../css/kanban.css";
import PriorityBadge from "./PriorityPart";

const KanbanCard = ({ ticket, users, isChecked, onCheck, groupBy }) => {
  // getting user based on id--------------------------
  const user = users.find((u) => u.id === ticket.userId);


  const getUserInitials = (name) => {
    if (!name) return "?";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase()
      );
    }
    return name.charAt(0).toUpperCase();
  };

  // like i used this to show random bg color for the circle avatar as in the api
  // there is no img urls so i used like this😅
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="kanbancard">
      <div className="cardheader">
        <strong>{ticket.id}</strong>
        {/* like as in screenshot so showing avatar if groupBy is not userId */}
        {groupBy !== "userId" && user && (
          <div className="useravatar" style={{ backgroundColor: getRandomColor() }}>
            {getUserInitials(user.name)}
          </div>
        )}
      </div>
      <div className="cardbody">
        <div className="cardtitle">
          <input
            type="checkbox"
            className="cardcheckbox"
            checked={isChecked}
            onChange={() => onCheck(ticket)}
          />
          <h4 className="card_title">{ticket.title}</h4>
        </div>
      </div>
      <div className="cardfooter">
        <div className="footerpriority">
          <PriorityBadge priority={ticket.priority} showOnlyImage />
        </div>
        <div className="featuretagcont">
          <span className="circle"></span>
          <span className="featuretag">{ticket.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
