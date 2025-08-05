
import apiUrl from "@/utils/ApiUrl/apiUrl";
import React from "react";
import SubjectShow from "@/components/templatess/SubjectShow/SubjectShow";

export async function generateMetadata({ params }) {
  const { id } = params;

  const subject = await fetch(`${apiUrl}/api/CySubjects/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  return {
    title: `${subject.title} | کامپیوترصانع`,
    description: subject.describtion,
    openGraph: {
      title: `${subject.title} | کامپیوترصانع`,
      description: subject.describtion,
      images: [
        {
          url: subject.smallImg,
          width: 1200,
          height: 630,
          alt: subject.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: subject.title,
      description: subject.describtion,
      images: [subject.smallImg],
    },

    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: subject.title,
        description: subject.describtion,
        image: subject.smallImg,
        author: {
          "@type": "Person",
          name: subject.tag || "ناشناس",
        },
        publisher: {
          "@type": "Organization",
          name: "کامپیوترصانع",
          logo: {
            "@type": "ImageObject",
            url: "https://sapi.sanecomputer.com/GFiles/25-08-05/photo_2024-05-30_19-08-29.jpg",
          },
        },
        datePublished: subject.dateShow,
        dateModified: subject.dateExp || subject.dateShow,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://sanecomputer.com/subject/${id}`,
        },
      }),
    },
  };
}

export default async function SubjectDetail({ params }) {

  return <SubjectShow param={params.id} />


    ;
}
