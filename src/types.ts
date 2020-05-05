export type FeedType = {
  description: string;
  id: number;
  link: string;
  title: string;
}

export type ResponseType = {
  error: boolean;
  errorMsg?: string;
  feed: FeedType[];
}

export type AppStateType = {
  error: boolean;
  errorMsg: string;
  feed: FeedType[];
  isLocked: boolean;
  page: number;
  rssURL: string;
};

export type FeedPropType = {
  data: FeedType[];
};

export type FormPropType = {
  handleInput: (event: React.ChangeEvent) => void;
  rssURL: string;
  submit: (event: React.FormEvent) => void;
};

export type PaginationPropType = {
  changePage: (page: number) => void;
  page: number;
  total: number;
};

export type NotificationPropType = {
  close: (event: React.MouseEvent) => void;
  errorMsg: string;
}
