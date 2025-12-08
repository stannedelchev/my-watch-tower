// {
//     "tle0": "0 ISS (ZARYA)",
//     "tle1": "1 25544U 98067A   25341.89741187  .00012051  00000-0  22339-3 0  9991",
//     "tle2": "2 25544  51.6302 166.4547 0003425 217.7386 142.3363 15.49404055542101",
//     "tle_source": "Space-Track.org",
//     "sat_id": "XSKZ-5603-1870-9019-3066",
//     "norad_cat_id": 25544,
//     "updated": "2025-12-08T05:15:34.711335+0000"
//   },

export type SatnogsdbTle = {
  tle0: string;
  tle1: string;
  tle2: string;
  tle_source: string;
  sat_id: string;
  norad_cat_id: number;
  updated: string;
};
