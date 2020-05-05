import React from "react";
import { mount } from "enzyme";
import Feed from "Component/Feed";

describe("Renders Feed", () => {
  let wrapper;
  const data = [
    {
      "description": "As countries lie frozen in lockdown and billions of people lose their livelihoods, public figures are teasing a breakthrough that would mark the end of the crippling coronavirus pandemic: a vaccine.",
      "id": 0,
      "link": "https://www.cnn.com/2020/05/03/health/coronavirus-vaccine-never-developed-intl/index.html",
      "title": "What happens if a coronavirus vaccine is never developed? It has happened before"
    },
    {
      "description": "",
      "id": 1,
      "link": "https://cnn.it/3dc9oe0",
      "title": "Boris Johnson says 'arrangements' for his death were made when he was in hospital with coronavirus"
    },
    {
      "description": "Pandemic experts John Barry and Marc Lipsitch co-authored a new report predicting that the coronavirus pandemic could last up to two more years. They're warning that things could get \"considerably worse than what we've seen so far.\" ",
      "id": 2,
      "link": "https://www.cnn.com/videos/us/2020/05/01/pandemic-experts-sobering-warning-coronavirus-future-john-barry-marc-lipsitch-ebof-vpx.cnn",
      "title": "Pandemic experts issue sobering warning about future"
    },
    {
      "description": "North Korea fired gunshots at the wall of a South Korean guard post in the Demilitarized Zone (DMZ), a buffer area which separates the two countries, on Sunday, and the South fired back, according to its military.",
      "id": 3,
      "link": "https://www.cnn.com/2020/05/03/asia/north-korea-gunfire-south-dmz-intl/index.html",
      "title": "Gunfire exchanged in DMZ across border between North and South Korea"
    }
  ];

  beforeEach(() => {
    wrapper = mount(<Feed data={data} />);
  });

  it("renders Feed", () => {
    expect(wrapper.find(Feed).exists()).toBe(true);
  });

  it("renders 3 feed LIs", () => {
    expect(wrapper.find("li").length).toEqual(data.length);
  });

  it("LI has an title and description", () => {
    const firstFeed = wrapper.find("li:first-child");
    expect(firstFeed.find("a").props().href).toEqual(data[0].link);
    expect(firstFeed.find("a").props().rel).toEqual("noreferrer noopener");
    expect(firstFeed.find(".title").text()).toEqual(data[0].title);
    expect(firstFeed.find(".description").text()).toEqual(data[0].description);
  });

});
