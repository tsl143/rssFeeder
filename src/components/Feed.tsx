import React from "react";
import sanitize from "sanitize-html";
import { FeedPropType } from "../types";

// Its fine to use dangerouslySetInnerHTML as we are sanitizing the data
const Feed: React.SFC<FeedPropType> = ({ data }) => (
  <ul id="feedHolder">
    {
      data.map(f => (
        <li className="feed" key={f.id}>
          <a href={f.link} target="_blank" rel="noreferrer noopener"><span className="title">{f.title}</span></a>
          <span className="description" dangerouslySetInnerHTML={{__html: sanitize(f.description)}} />
        </li>
      ))
    }
  </ul>
);

export default React.memo(Feed);
