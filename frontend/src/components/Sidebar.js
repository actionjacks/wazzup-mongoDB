import React from "react";
import "../style/Sidebar.css";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DetailsIcon from "@material-ui/icons/Details";
import FeedbackIcon from "@material-ui/icons/Feedback";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { IconButton, Avatar } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__heaerRight">
          <Avatar src="" />
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <DetailsIcon />
          </IconButton>
          <IconButton>
            <FeedbackIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <LocationSearchingIcon />
          <input placeholder="search or chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
