import React from "react";
import { NotificationPropType } from "../types";

const Notification: React.SFC<NotificationPropType> = ({ errorMsg, close }) => (
  <div id="notification">
    <p>{errorMsg}</p>
    <span onClick={close}>x</span>
  </div>
)

export default React.memo(Notification);
