import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import News from "../components/AboutPage/News/news";
import { fetchCollections } from "./api/fetchWebflow";
import { useLocalization } from "../context/languageContext";
import AboutText from "../components/AboutPage/Text/aboutText";
import HeadPicture from "../components/ui/headPicture/headPicture";

const About: NextPage = ({ collections }: any) => {
  const { t } = useLocalization();
  return (
    <>
      <Head>
        <title>Photon Power - {t.about}</title>
        <meta name="Photon Power about page" content={t.aboutMeta} />
        <link rel="icon" href="/fav.svg" />
      </Head>
      <HeadPicture imageUrl="/gallery/pic13.webp" />
      <br />
      <h2 className="newsTitle">{t.about}</h2>
      <br />
      <AboutText />
      <News collections={collections} />
    </>
  );
};
export async function getStaticProps() {
  const collections = await fetchCollections();

  return {
    props: {
      collections,
    },
    revalidate: 60,
  };
}

export default About;
