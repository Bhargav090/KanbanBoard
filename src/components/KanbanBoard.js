import React, { useState, useEffect } from "react";
import { fetchTickets } from "../apis/Api";
import KanbanColumn from "./KanbanColumn";
import "../css/kanban.css";
import sortLogo from "../assets/Display.svg";
import downArrow from "../assets/down.svg";
const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem("groupBy") || "priority");
  const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || "priority");
  const [checkedTickets, setCheckedTickets] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // all status heading elements------------------------------
  const statusColumns = ["Backlog", "Todo", "In progress", "Completed", "Canceled"];

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const groupTickets = (tickets, field) => {
    const groupedTickets = tickets.reduce((acc, ticket) => {
      const key = ticket[field];
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
  
    if (field === "status") {
      // Ensure all statuses from statusColumns are present
      statusColumns.forEach((status) => {
        if (!groupedTickets[status]) groupedTickets[status] = [];
      });
    }
  
    return groupedTickets;
  };
  

  const handleTicketCheck = (ticket) => {
    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === ticket.id
          ? { ...t, status: t.status === "Completed" ? "In progress" : "Completed" }
          : t
      )
    );

    setCheckedTickets((prev) =>
      prev.includes(ticket.id)
        ? prev.filter((id) => id !== ticket.id)
        : [...prev, ticket.id]
    );
  };

  // sorting tickets based on selected sortby field-----------------------------------
  const sortTickets = (tickets, sortBy) => {
    switch (sortBy) {
      case "priority":
        return tickets.sort((a, b) => b.priority - a.priority); 
      case "title":
        return tickets.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  return (
    <div>
      <div className="kanbancontrols">
        {/* header display part---------------------------- */}
        <div
          className="display"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={sortLogo} alt="Sort" className="sort-logo" />
          <span>Display</span>
          <img src={downArrow} alt="Toggle" className="down-arrow" />
        </div>

        {dropdownOpen && (
          <div className="dropdownbox">
            <div className="dropdownitem">
              <label>Group By:</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="priority">Priority</option>
                <option value="userId">User</option>
              </select>
            </div>

            <div className="dropdownitem">
              <label>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {/* mainbody part---------------------------- */}
      <div className="kanbanboard">
        {(groupBy === "status" ? statusColumns : Object.keys(groupedTickets)).map((key) => {
          const sortedTickets = sortTickets(groupedTickets[key] || [], sortBy);
          return (
            <KanbanColumn
              key={key}
              title={key}
              tickets={sortedTickets}
              sortBy={sortBy}
              users={users}
              groupBy={groupBy}
              onTicketCheck={handleTicketCheck}
              checkedTickets={checkedTickets}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
