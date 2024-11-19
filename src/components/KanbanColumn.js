import React from "react";
import KanbanCard from "./KanbanCard";
import backlogImg from "../assets/Backlog.svg";
import todoImg from "../assets/To-do.svg";
import inProgressImg from "../assets/in-progress.svg";
import completedImg from "../assets/Done.svg";
import canceledImg from "../assets/Cancelled.svg";
import add from "../assets/add.svg";
import noPriorityImg from "../assets/dots.svg";
import PriorityBadge from "./PriorityPart";

const statusLabels = {
  "Backlog": { label: "Backlog", img: backlogImg },
  "In progress": { label: "In Progress", img: inProgressImg },
  "Todo": { label: "To Do", img: todoImg },
  "Completed": { label: "Done", img: completedImg },
  "Canceled": { label: "Canceled", img: canceledImg },
};

const KanbanColumn = ({ title, tickets, sortBy, users, groupBy, onTicketCheck, checkedTickets }) => {

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
  // rendering column header based on grouping type-------------------
  const renderColumnHeader = () => {
    switch (groupBy) {
      case "priority":
        return (
          <div className="top">
            <PriorityBadge priority={title} />
            <h3 className="statusnum">{tickets.length}</h3>
          </div>
        );

      case "status":
        const { label: statusLabel, img: statusImg } = statusLabels[title] || {};
        return (
          <div className="top">
            {statusImg && <img src={statusImg} className="img1" alt={`${statusLabel} icon`} />}
            <h3>
              {statusLabel || title} <span className="statusnum">{tickets.length}</span>
            </h3>
          </div>
        );

      case "userId":
        const user = users.find((u) => u.id === title);
        return (
          <div className="top">
            {user && (
              <div className="useravatar" style={{ backgroundColor: getRandomColor() }}>
                {getUserInitials(user.name)}
              </div>
            )}
            <h3>
              {user ? user.name : "Unassigned"} <span className="statusnum">{tickets.length}</span>
            </h3>
          </div>
        );

      default:
        return (
          <div className="top">
            <h3>
              {title} {tickets.length}
            </h3>
          </div>
        );
    }
  };

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

  // filtering tickets based on the column and checked state----------------
  const getTicketsToRender = () => {
    if (groupBy === "status") {
      if (title === "Completed") {
        // as shown in screenshot only checked tickets in Completed column-------------
        return tickets.filter((ticket) => checkedTickets.includes(ticket.id));
      }
      if (title === "Canceled") {
        // not mentioned anything for canceled so just kept😅------------
        return [];
      }
      return tickets;
    }
    return tickets;
  };

  return (
    <div className="kanbancolumn">
      <div className="head">
        {renderColumnHeader()}
        <div>
          <img src={add} className="img1" alt="add" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img src={noPriorityImg} className="img1" alt="display" />
        </div>
      </div>
      {getTicketsToRender().map((ticket) => (
        <KanbanCard
          key={ticket.id}
          ticket={ticket}
          users={users}
          isChecked={checkedTickets.includes(ticket.id)}
          onCheck={onTicketCheck}
          groupBy={groupBy}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;
