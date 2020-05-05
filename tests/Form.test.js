import React from "react";
import { mount } from "enzyme";
import Form from "Component/Form";

const handleInput = jest.fn();
const submit = jest.fn();

describe("Renders Form", () => {
  let wrapper;

  beforeEach(() => {
    
    wrapper = mount(<Form
      handleInput={handleInput}
      rssURL=""
      submit={submit}
    />);
  });

  it("renders Form", () => {
    expect(wrapper.find("#searchBox").exists()).toBe(true);
  });

  it("Form has input and button", () => {
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("input").length).toEqual(1);
    expect(wrapper.find("button").length).toEqual(1);
    expect(wrapper.find("button").text()).toEqual("GO");    
  });

  it("Form has input and button", () => {
    const input = wrapper.find("input");
    const form = wrapper.find("form");
    
    input.simulate("change", { key: "a" });
    expect(handleInput).toHaveBeenCalledTimes(1);

    input.simulate("change", { key: "http://rss.cnn.com/rss/edition_americas.rss" });
    form.simulate("submit");
    expect(submit).toHaveBeenCalledTimes(1);
    
  });

});
