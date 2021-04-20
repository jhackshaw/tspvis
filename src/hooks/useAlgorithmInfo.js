import { useStaticQuery, graphql } from "gatsby";

export const useAlgorithmInfo = () => {
  const {
    allMarkdownRemark: { edges: algorithms }
  } = useStaticQuery(graphql`
    query AlgorithmModalsQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            type: {
              in: [
                "exhaustive"
                "heuristic-construction"
                "heuristic-improvement"
              ]
            }
          }
        }
        sort: { fields: frontmatter___order }
      ) {
        edges {
          node {
            frontmatter {
              order
              friendlyName
              solverKey
              type
              defaults {
                evaluatingDetailLevel
                maxEvaluatingDetailLevel
              }
            }
            html
          }
        }
      }
    }
  `);

  return algorithms.map(alg => ({
    ...alg.node.frontmatter,
    html: alg.node.html
  }));
};
