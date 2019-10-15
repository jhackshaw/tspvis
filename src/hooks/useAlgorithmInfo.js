import { useStaticQuery, graphql } from 'gatsby';

export default () => {
  const { allMarkdownRemark: { edges: algorithms }} = useStaticQuery(graphql`
    query AlgorithmModalsQuery {
      allMarkdownRemark(filter: {frontmatter: {type: {eq: "algorithm"}}}, sort: {fields: frontmatter___friendlyName}) {
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
