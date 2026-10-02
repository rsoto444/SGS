// THE ONE FILE TO EDIT FIRST.
// Every page reads from here.

export const site = {
  name: "Shop Local Provo",
  tagline: "The local business directory for Provo, Utah",
  description:
    "Find and support local businesses in Provo, Utah. Browse by category, see who is open and how to reach them, and get matched with a local pro.",
  url: "https://shoplocalprovo.com",
  city: "Provo",
  state: "UT",
  // Provo city centre. Used to bias the Google Maps lookup toward Provo.
  geo: { lat: 40.2338, lng: -111.6585, radiusMeters: 30000 },

  // Operated by Provo SEO Pros.
  parent: { name: "Provo SEO Pros", url: "https://provoseopros.com" },

  // GHL inbound webhook. Every form on the site posts here via /api/lead.
  // Set LEAD_WEBHOOK_URL in Vercel (preferred) or paste it here.
  leadWebhook: (process.env.LEAD_WEBHOOK_URL ?? null) as string | null,

  // Shown in the footer and on /contact. Address is left blank on purpose (owner's call).
  phone: "(801) 372-2776",
  email: "contact@provoseopros.com",
  address: "",

  // A category page with fewer listings than this is thin content. It stays
  // reachable for visitors but is noindexed and kept out of the sitemap.
  minListingsToIndex: 3,

  // Premium and ad pricing, set by the owner (October 2026). Change here, the Advertise page follows.
  plans: {
    premiumMonthly: "$29",
    premiumYearly: "$290",
    categorySponsor: "$49",
    homeSponsor: "$99",
  },
};
