/* globals process */
import React from "react";
import { mount } from "enzyme";
import App from "Component/App";
import Form from "Component/Form";
import Pagination from "Component/Pagination";
import Notification from "Component/Notification";
import { jsonData } from "./xml";

describe("Render", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it("renders App", () => {
    expect(wrapper.find(App).exists()).toBe(true);
    expect(wrapper.find(Form).exists()).toBe(true);
  });

  it("renders enters URL", () => {
    const instance = wrapper.instance();
    const spyInput = jest.spyOn(instance, "handleInput");
    const spySubmit = jest.spyOn(instance, "submit");
    instance.forceUpdate();

    const input = wrapper.find(Form).find("input");
    const form = wrapper.find(Form).find("form");
    input.simulate("change", { target: { value: "https://www.example.com" } });
    expect(spyInput).toHaveBeenCalled();
    form.simulate("submit");
    expect(spySubmit).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith("https://www.example.com");
  });

  it("renders Pagination", () => {
    const instance = wrapper.instance();
    const spyChangePage = jest.spyOn(instance, "changePage");
    instance.forceUpdate();

    wrapper.setState({ feed: jsonData });
    const pills = wrapper.find(Pagination);
    expect(pills.length).toEqual(1);
    pills.find("li:last-child").simulate("click");
    expect(spyChangePage).toHaveBeenCalled();
  });

  it("renders Notification", () => {
    const instance = wrapper.instance();
    const spyCloseModal = jest.spyOn(instance, "closeModal");
    instance.forceUpdate();

    wrapper.setState({ error: true, errorMsg: "The error message" });
    const notify = wrapper.find(Notification);
    expect(notify.find("p").text()).toEqual("The error message");
    notify.find("span").simulate("click");
    expect(spyCloseModal).toHaveBeenCalled();
  })
});

describe("Feed data", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, NODE_ENV: "development" };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("sets data on successful fetch", () => {
    const wrapper = mount(<App />);
    const input = wrapper.find(Form).find("input");
    const form = wrapper.find(Form).find("form");
    input.simulate("change", { target: { value: "https://www.example.com" } });
    form.simulate("submit");
    expect(fetch)
      .toHaveBeenCalledWith("http://localhost:8080/api?q=https%3A%2F%2Fwww.example.com");

    process.nextTick(() => {
      expect(wrapper.state().isLocked).toBe(true);
      expect(wrapper.state().feed.length).toEqual(1);
      expect(wrapper.state().feed[0].title).toEqual(jsonData[0].title);
      expect(wrapper.state().feed[0].description).toEqual(jsonData[0].description);
    });
  });

  it("shows notification on fetch fail", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({ ok: false }));
    const wrapper = mount(<App />);
    const input = wrapper.find(Form).find("input");
    const form = wrapper.find(Form).find("form");
    input.simulate("change", { target: { value: "https://www.example.com" } });
    form.simulate("submit");

    process.nextTick(() => {
      expect(wrapper.state().errorMsg).toEqual("Error: Fetch Fail");
      expect(wrapper.state().error).toEqual(true);
    });
  });
});
