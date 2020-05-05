import { FeedType, ResponseType } from "./types";

export const getRSS = (u: string): Promise<ResponseType> => {
  const DP = new DOMParser();
  const parseXML = (x: string) =>  DP.parseFromString(x, "text/xml");
  
  // This solves the CORS problem for dev server.
  // in webpack dev config, a dev server is defined
  // which serves as middleware.
  // the call to remote is done via node fetch and the 
  // response is sent over same localhost port
  // hence eliminating CORS error.
  let fetchURL = u;
  if (process.env.NODE_ENV === "development") {
    fetchURL = (`http://localhost:8080/api?q=${encodeURIComponent(u)}`);
  }
    
  return fetch(fetchURL)
    .then(res => {
      if (res.ok) return res.text();
      throw new Error("Fetch Fail");
    })
    .then((xmlText: string) => {
      const feed: FeedType[] = [];
      const doc = parseXML(xmlText);
      const items = doc.querySelectorAll("item");
      items.forEach((item, index) => {
        const title = item.querySelector("title");
        const description = item.querySelector("description");
        const link = item.querySelector("link");
        feed.push({
          description: description && description.textContent || "",
          id: index,
          link: link && link.textContent || "",
          title: title && title.textContent || ""
        })
      });
      return {
        error: false,
        feed
      };
    })
    .catch(e => {
      return {
        error: true,
        errorMsg: e.toString(),
        feed: []
      };
    })
};