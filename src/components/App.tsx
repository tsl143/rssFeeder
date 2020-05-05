import React from "react";

import "../App.css";
import Feed from "./Feed";
import Form from "./Form";
import Notification from "./Notification";
import Pagination from "./Pagination";
import { AppStateType, FeedType, ResponseType } from "../types"
import { pageSize } from "../globals";
import { getRSS } from "../data";

export default class App extends React.PureComponent<{}, AppStateType>{
  constructor(props: {}) {
    super(props);
    this.state = {
      error: false,
      errorMsg: "",
      feed: [],
      isLocked: false,
      page: 1,
      rssURL: ""
    };
  }

  handleResponse = (res: ResponseType) => {
    const { error, errorMsg, feed } = res;
    const newState = { ...this.state, page: 1, isLocked: true };
    // There can be cases the entered URL is not a feed URL
    // in that case the getRSS may return `error: false` but
    // the `feed` array will be empty.
    if (error || feed.length === 0) {
      newState.error = true;
      newState.errorMsg = errorMsg || "No Feeds were found, Please recheck the URL";
      newState.feed = [];
    } else {
      newState.error = false;
      newState.errorMsg = "";
      newState.feed = feed;
    }
    this.setState(newState);
  }

  submit = (event: React.FormEvent): void => {
    event.preventDefault();
    const { isLocked, rssURL } = this.state;
    if (isLocked) return;
    getRSS(rssURL)
    .then(this.handleResponse);
  }

  handleInput = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLTextAreaElement;
    this.setState({
      isLocked: false,
      rssURL: target.value
    });
  }

  closeModal = (event: React.MouseEvent): void => {
    this.setState({ error: false, errorMsg: "" });
  }

  changePage = (page: number) => {
    this.setState({ page });
    window.scrollTo(0, 0);
  }

  getCurrentFeed = (feed: FeedType[], page: number): FeedType[] => {
    const start = (page-1) * pageSize;
    const end = start + pageSize;
    return feed.slice(start, end);
  }

  render() {
    const { error, errorMsg, feed, page, rssURL } = this.state;

    return (
      <div className="App">
        <Form handleInput={this.handleInput} rssURL={rssURL} submit={this.submit} />
        {
          feed.length > 0 &&
          <>
            <Feed data={this.getCurrentFeed(feed, page)} />
            <Pagination changePage={this.changePage} page={page} total={feed.length}/>
          </>
        }
        {error && <Notification errorMsg={errorMsg} close={this.closeModal}/>}
      </div>
    );
  }
}
