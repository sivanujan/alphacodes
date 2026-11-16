export interface ContactData {
  address: string;
  mapsUrl: string;
  phone: string;
  email: string;
  linkedin: string;
  otherSocials: {
    github?: string;
    twitter?: string;
    facebook?: string;
  };
  parent: {
    text: string;
    url: string;
    name: string;
    companyNo: string;
    jurisdiction: string;
  };
}

export const CONTACT_DATA: ContactData = {
  address: "No. 108, Rathinapuram Road, Kilinochchi, Northern Province 44000, Sri Lanka",
  mapsUrl: "https://maps.google.com/?q=No.+108,+Rathinapuram+Road,+Kilinochchi,+Northern+Province+44000,+Sri+Lanka",
  phone: "TODO", // Placeholder — do not invent, update when confirmed
  email: "TODO", // Placeholder — do not invent, update when confirmed
  linkedin: "TODO", // Placeholder — do not invent, update when confirmed
  otherSocials: {
    github: "", // optional, hidden when empty or "TODO"
    twitter: "", // optional, hidden when empty or "TODO"
  },
  parent: {
    text: "A subsidiary of THAAYAKAM LTD (UK) — Company No. 12875849, registered in England & Wales",
    url: "https://www.thaayakam.co.uk",
    name: "THAAYAKAM LTD",
    companyNo: "12875849",
    jurisdiction: "registered in England & Wales",
  },
};
