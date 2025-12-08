// {
//     "sat_id": "SCHX-0895-2361-9925-0309",
//     "norad_cat_id": 965,
//     "norad_follow_id": null,
//     "name": "TRANSIT 5B-5",
//     "names": "OPS 6582",
//     "image": "satellites/transit-o__1.jpg",
//     "status": "alive",
//     "decayed": null,
//     "launched": "1964-12-13T00:00:00Z",
//     "deployed": null,
//     "website": "",
//     "operator": "None",
//     "countries": "US",
//     "telemetries": [],
//     "updated": "2024-09-16T18:41:03.363197Z",
//     "citation": "https://secwww.jhuapl.edu/techdigest/Content/techdigest/pdf/V05-N04/05-04-Danchik.pdf https://www.satellitenwelt.de/transit_5b-5.htm",
//     "is_frequency_violator": false,
//     "associated_satellites": []
//   },

export type SatnogsdbSatellite = {
  sat_id: string;
  norad_cat_id: number;
  norad_follow_id: number | null;
  name: string;
  names: string;
  image: string;
  status: string;
  decayed: string | null;
  launched: string;
  deployed: string | null;
  website: string;
  operator: string;
  countries: string;
  telemetries: any[];
  updated: string;
  citation: string;
  is_frequency_violator: boolean;
  associated_satellites: any[];
};
