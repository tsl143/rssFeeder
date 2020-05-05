import React from "react";
import { mount } from "enzyme";
import Pagination from "Component/Pagination";
import { pageSize } from "src/globals";

describe("Renders Pagination", () => {
  let wrapper;

  const changePage = jest.fn();
  const page = 1;
  const total = 15;
  const pages = Math.ceil(total/pageSize);
  beforeEach(() => {
    wrapper = mount(<Pagination
      changePage={changePage}
      page={page}
      total={total}
    />);
  });

  it("renders Pagination", () => {
    expect(wrapper.find("#pagination").length).toEqual(1);
  });

  it(`renders ${pages} pills`, () => {
    expect(wrapper.find("li").length).toEqual(2);
  });

  it("handles page click", () => {
    wrapper.find("li:last-child").simulate("click");
    expect(changePage).toHaveBeenCalledWith(2);
  });
});

describe("Pagination next/prev", () => {
  it("handles next navs click", () => {
    const changePage = jest.fn();
    const wrapper = mount(<Pagination
      changePage={changePage}
      page={1}
      total={55}
    />);
    
    expect(wrapper.find("#prev").exists()).toBe(false);
    expect(wrapper.find("#next").exists()).toBe(true);
    wrapper.find("#next").simulate("click");
    expect(changePage).toHaveBeenCalledWith(4);
  });

  it("handles next navs click", () => {
    const changePage = jest.fn();
    const wrapper = mount(<Pagination
      changePage={changePage}
      page={4}
      total={55}
    />);
    
    expect(wrapper.find("#prev").exists()).toBe(true);
    expect(wrapper.find("#next").exists()).toBe(false);
    wrapper.find("#prev").simulate("click");
    expect(changePage).toHaveBeenCalledWith(3);
  });
});