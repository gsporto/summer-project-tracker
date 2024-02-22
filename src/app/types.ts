import type { ULID } from "ulidx";

export type Weeks = {
  id: number,
  status: "completed" | "uncompleted" | "pending",
};

export type User = {
  id: ULID;
  name: string;
  weeks: Array<Weeks>;
};
