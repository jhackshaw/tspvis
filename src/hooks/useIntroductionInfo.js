import { useStaticQuery, graphql } from "gatsby";

export const useIntroductionInfo = () => {
  const {
    allMarkdownRemark: { edges: introductions }
  } = useStaticQuery(graphql`
    query IntroductionModalQuery {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "introduction" } } }
      ) {
        edges {
          node {
            html
          }
        }
      }
    }
  `);

  return introductions[0].node.html;
};
