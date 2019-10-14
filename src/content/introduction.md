---
type: introduction
---

# Traveling Salesman Problem

The traveling salesman problem (TSP) asks the question, "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".

It has been studied extensively in computer science and plenty of algorithms have been devised, generally classified as exhaustive or heuristic.

#### Exhaustive
          
Exhaustive algorithms will always find the best possible solution by evaluating every possible path. These algorithms are typically significantly more expensive then the heuristic algorithms discussed next. The exhaustive algorithms implemented so far include:
  - Random Paths
  - Depth First Search (Brute Force)
  - Branch and Bound (Cost)
  - Branch and Bound (Cost, crossings)

#### Heuristic

Heuristic algorithms attempt to find a good approximation of the optimal path within a more <i>reasonable</i> amount of time. The heuristic algorithms implemented so far include:
  - Shortest Path
  - 2-Opt Substitution

### This site

Some of the main things to keep in mind when using this site:
  - As you apply different algorithms, the current best path is saved and used as input to whatever you run next. (e.g. shortest path first -> branch and bound)
  - These are not intended to be ultra-effecient - although these algorithms visualize and demonstrate how to solve the traveling salesman problem, much more effecient means are available outside of the browser.

## FAQ
*in order of most frequently asked*

**Javascript is for wussy's, use a manly language like C (better yet, rust)**

The point of this is not to be an efficient means to solve real-world traveling salesman problems, but to be an interactive learning experience for those looking to familiarize themselves with common algorithms.

**You're implementations are stupid**

I'm open to pull requests that improve the efficiency of the algorithms demonstrated

**I heard about, or have an idea for, an algorithm that I want simulated**

Finally, a question! I'm open to pull-requests. If javascript isn't your thing, reach out to me on [github](https://github.com/jhackshaw/tspvis) and I will help you introduce it to tspvis.

**I'm still not getting it**

There are lots of resources out there - this is an extensivly studied problem. Open an issue on github [here](https://github.com/jhackshaw/tspvis/issues) and I promise I will respond with resources for further study.

**Neato, how does it work**

These are the main tools used to build this site:

   - [gatsbyjs](https://www.gatsbyjs.org)
   - [reactjs](https://reactjs.org)
   - [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
   - [material-ui](https://material-ui.com/)
   - [deck.gl](https://deck.gl/#/)
   - [mapbox](https://www.mapbox.com/)