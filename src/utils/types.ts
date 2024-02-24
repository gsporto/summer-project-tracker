import type { ULID } from 'ulidx';

export type Weeks = {
  id: number;
  days: Array<string>;
};

export type WeekType = 'completed' | 'in-progress' | 'pending' | 'uncompleted';

export type User = {
  id: ULID;
  idWorkout: number;
  name: string;
  weeks: Array<Weeks>;
};

type Media = {
  id: number;
  width: number;
  url: string;
  height: number;
  medium_type: string;
  thumbnail_url: string;
  aspect_ratio: number;
};

type Account = {
  id: number;
  email: string;
  full_name: string;
  profile_picture_url: string;
};

type Activity = {
  id: string;
  name: string;
  how_much_amount_needed: number;
  how_much_metric_type: string;
  icon_url: string;
  scoring_method: string;
  challenge_id: number;
  formatted_details: {
    how_much_amount_needed: string;
  };
};

type FormattedDetails = {
  duration: string;
  points: string;
  steps: string;
  distance: string;
};

type Workout = {
  id: number;
  description: null;
  title: string;
  duration: number;
  media: Array<Media>;
  points: number;
  account: Account;
  steps: number;
  distance: string;
  challenge_id: number;
  photo_url: string;
  created_at: string;
  occurred_at: string;
  activity: Activity;
  formatted_details: FormattedDetails;
  hustle_points: number;
};

export type WorkoutsData = {
  data: Array<Workout>;
};
