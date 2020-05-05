/* globals global */
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { xml } from "./xml";

configure({ adapter: new Adapter() });

// Mock fetch to provide sample results
// Additionally this will help us to spy on fetch calls
const mockFetch = Promise.resolve({
  text: () => Promise.resolve(xml),
  ok: true
});
global.fetch = jest.fn().mockImplementation(() => mockFetch);
global.scrollTo = jest.fn();
