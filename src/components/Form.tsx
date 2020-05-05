import React from "react";
import { FormPropType } from "../types";

const Form: React.SFC<FormPropType> = ({ handleInput, rssURL, submit }) => (
  <div id="searchBox">
    <form onSubmit={submit}>
      <input
        required
        onChange={handleInput}
        type="url"
        value={rssURL}
      />
      <button>GO</button>
    </form>
  </div>
);

export default React.memo(Form);
