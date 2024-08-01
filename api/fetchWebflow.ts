import axios from "axios";
export interface News {
  name: string;
  slug: string;
  "001": {
    fileId: string;
    url: string;
    alt: string | null;
  };
  _id: string;
  tldr: string;
}
const apiKey = `${process.env.WEBFLOW_API_KEY}`; //you need V1 token from webflow, single token not work
export async function fetchCollections(): Promise<News[]> {
  const collectionId = `${process.env.WEBFLOW_COLLECTION_ID}`;
  const response = await axios.get(
    `https://api.webflow.com/collections/${collectionId}/items`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.items;
}
