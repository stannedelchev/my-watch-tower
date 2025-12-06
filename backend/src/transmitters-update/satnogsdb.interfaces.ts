// {
//     "uuid": "3LjeHjLRB7se3ey8UmvHd7",
//     "description": "HRPT",
//     "alive": true,
//     "type": "Transmitter",
//     "uplink_low": null,
//     "uplink_high": null,
//     "uplink_drift": null,
//     "downlink_low": 1700000000,
//     "downlink_high": null,
//     "downlink_drift": null,
//     "mode": "HRPT",
//     "mode_id": 45,
//     "uplink_mode": null,
//     "invert": false,
//     "baud": 3000000,
//     "sat_id": "VSVI-4798-5613-4587-2414",
//     "norad_cat_id": 59051,
//     "norad_follow_id": null,
//     "status": "active",
//     "updated": "2024-02-23T14:08:47.096389Z",
//     "citation": "https://space.oscar.wmo.int/satellites/view/meteor_m_n2_4",
//     "service": "Meteorological",
//     "iaru_coordination": "N/A",
//     "iaru_coordination_url": "",
//     "itu_notification": {
//       "urls": []
//     },
//     "frequency_violation": false,
//     "unconfirmed": false
//   },
export type SatnogsdbTransmitter = {
  uuid: string;
  description: string;
  alive: boolean;
  type: string;
  uplink_low: number;
  uplink_high: number;
  uplink_drift: number;
  downlink_low: number;
  downlink_high: number;
  downlink_drift: number;
  mode: string;
  mode_id: number;
  uplink_mode: string;
  invert: boolean;
  baud: number;
  sat_id: string;
  norad_cat_id: number;
  norad_follow_id: number;
  status: string;
  updated: string;
  citation: string;
  service: string;
  iaru_coordination: string;
  iaru_coordination_url: string;
  frequency_violation: boolean;
  unconfirmed: boolean;
};
