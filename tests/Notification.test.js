import React from "react";
import { mount } from "enzyme";
import Notification from "Component/Notification";

describe("Renders Notification", () => {
  let wrapper;

  const closeModal = jest.fn();
  const msg = "There is error!";
  beforeEach(() => {
    wrapper = mount(<Notification
      errorMsg={msg}
      close={closeModal}
    />);
  });

  it("renders Notification", () => {
    expect(wrapper.find("#notification").length).toEqual(1);
  });

  it("renders message and close button", () => {
    expect(wrapper.find("p").text()).toEqual(msg);
    expect(wrapper.find("span").text()).toEqual("x");
  });

  it("handles close click", () => {
    wrapper.find("span").simulate("click");
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
