export type PassPoint = {
  time: Date;
  azimuth: number;
  elevation: number;
  rangeSat: number;
};

export type PassSegment = {
  startTime: Date;
  endTime: Date;
  highestElevation: number;
  duration: number; // in seconds
  points: PassPoint[];
};
