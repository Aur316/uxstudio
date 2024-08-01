import axios from "axios";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

const WEBFLOW_BASE_URL = `${process.env.WEBFLOW_BASE_URL}`;

const NewsCard: NextPage<{
  htmlContent: string;
  pageNotFound: boolean;
}> = ({ htmlContent, pageNotFound }) => {
  return (
    <>
      <Head>
        <title>Photon Power - News</title>
        <meta
          name="Photon Power - News"
          content="This is the section of Photon Power News"
        />
        <link rel="icon" href="/fav.svg" />
      </Head>

      <main style={{ minHeight: "70vh" }}>
        <div id="notFound">
          {pageNotFound ? (
            <h1 className="cardNotDone">
              Page not yet done... Any time though!
            </h1>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as ParsedUrlQuery;
  let slug = params.slug as string; //pageone

  const url = `${WEBFLOW_BASE_URL}${slug}`;
  console.log(url);
  try {
    const response = await axios.get(url);

    const modifiedContent = `
      <style>
        a.w-webflow-badge {
          display: none !important;
        }
      </style>
      ${response.data}
    `;

    return {
      props: {
        htmlContent: modifiedContent,
        pageNotFound: false,
      },
    };
  } catch (error) {
    console.error("Failed to fetch the Webflow page:", error);
    return {
      props: {
        htmlContent: "",
        pageNotFound: true,
      },
    };
  }
};

export default NewsCard;
