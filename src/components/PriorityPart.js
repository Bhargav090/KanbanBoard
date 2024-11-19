import React from "react";
import urgentImg from "../assets/UPC.svg";
import highImg from "../assets/Img-HighPriority.svg";
import mediumImg from "../assets/Img-MediumPriority.svg";
import lowImg from "../assets/Img-LowPriority.svg";
import noPriorityImg from "../assets/dots.svg";
import "../css/kanban.css";


// Mapping priorities to labels and images---------------------
const priorityMap = {
  4: { label: "Urgent", img: urgentImg },
  3: { label: "High", img: highImg },
  2: { label: "Medium", img: mediumImg },
  1: { label: "Low", img: lowImg },
  0: { label: "No Priority", img: noPriorityImg },
};

const PriorityBadge = ({ priority, showOnlyImage }) => {
  const { label, img } = priorityMap[priority] || { label: "Unknown", img: noPriorityImg };

  return (
    <div className="top">
      <img src={img} alt={label} className="img" />
      {!showOnlyImage && <span className="labeltext">{label}</span>}
    </div>
  );
};

export default PriorityBadge;
