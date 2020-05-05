## RSS Feeder
A React, Typescript App for displaying RSS feed of a given URL.

### Getting started

  | Command                     | Description                        |
  |-----------------------------|------------------------------------|
  | `yarn install`              | Install all dependencies           |
  | `yarn start`                | Starts dev server 		             |
  | `yarn test`                 | run test cases in watch mode       |
  | `yarn coverage`             | run tests and coverage	           |


### App structure
- `App` maintains following localstate
    ```
    AppStateType = {
      error: boolean;
      errorMsg: string;
      feed: FeedType[];
      isLocked: boolean;
      page: number;
      rssURL: string;
    };

    error - Flag to show/hide error notification
    errorMsg - the error message
    feed - holds the array of fetched feed.
    isLocked - disables form submission.
    page - The current active displayed page
    rssURL - The URL entry in the searchbox
    ```

    The App starts with blank URL and empty feed.
    The input box is `type="URL"` so as to make use of native HTML5 validations.
    Once the form is submitted the submission is locked until there is a change in `rssURL`.
    Form submission invokes `getRSS`.
    `getRSS` fetches feed from remote (or via dev-server to avoid CORS).
    `handleResponse` pushes feed in App state or invokes error notification in case of error.
    Setting App state re-renders the component.
    The Feed component does not receive the complete feed, but only the feed which needs to be shown, this is handled by `getCurrentFeed`.

- `Form` - Functional component, creates searchbox with submit button
- `Feed` - Functional component, displays the feeds in form of UL LI
- `Pagination` - Functional component, Create the notification section.
- `Notification` - Functional component, creates notification.


### Performance
- The main App component is pure component and all others are Stateless functional components
- Memoization is used in all stateless components to avoid any unnecessary re-renders.

###  Assumptions
- Basic desktop/non-responsive UI required.
- Modern browser considered.

### Enhancements
  - Data is fetched from remote, adding a loader would be good.
  - There is basic HTML validations in Searchbox, adding some custom validation will help.
  - There can be better error handling in `getRSS` rather than generic no feeds found msg.
  - A few plugins can be added to webpack for optimizing production code like `uglifyjs-webpack-plugin`.
  - The `App.css` houses all the CSS rules, this can be split.
  - UI can be improved.

