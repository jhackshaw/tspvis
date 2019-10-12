import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  const { allMarkdownRemark: { edges: algorithms }} = useStaticQuery(graphql`
    query AlgorithmModalsQuery {
      allMarkdownRemark(filter: {frontmatter: {type: {eq: "algorithm"}}}) {
        edges {
          node {
            frontmatter {
              friendlyName
              solverKey
              type
              class
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
  `)

  return algorithms.map(alg => ({
    ...alg.node.frontmatter,
    html: alg.node.html
  }))
}
