import React from "react";
import Helmet from "react-helmet";

const description =
  "Interactive solver for the traveling salesman problem to visualize different algorithms. Includes various Heuristic and Exhaustive algorithms.";

export const SEO = ({ subtitle }) => {
  return (
    <Helmet
      title={`${subtitle}${
        subtitle ? " | " : ""
      }Traveling Salesman Problem Visualizer`}
      htmlAttributes={{ lang: "en" }}
    >
      <meta name="description" content={description} />

      <meta
        property="og:title"
        content={`Traveling Salesman Problem Visualizer`}
      />
      <meta property="og:url" content="https://tspvis.com" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://i.imgur.com/u4ibcsC.jpg" />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};
