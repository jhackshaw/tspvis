---
type: introduction
---

# Traveling Salesman Problem

The traveling salesman problem (TSP) asks the question, "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".

### This project

- The goal of this site is to be an **educational** resource to help visualize, learn, and develop different algorithms for the traveling salesman problem in a way that's easily accessible
- As you apply different algorithms, the current best path is saved and used as input to whatever you run next. (e.g. shortest path first -> branch and bound). The order in which you apply different algorithms to the problem is sometimes referred to the meta-heuristic strategy.

### Heuristic algorithms

Heuristic algorithms attempt to find a good approximation of the optimal path within a more _reasonable_ amount of time.

**Construction** - Build a path (e.g. shortest path)

- Shortest Path
- Arbitrary Insertion
- Furthest Insertion
- Nearest Insertion
- Convex Hull Insertion\*
- Simulated Annealing\*

**Improvement** - Attempt to take an existing constructed path and improve on it

- 2-Opt Inversion
- 2-Opt Reciprcal Exchange\*

### Exhaustive algorithms

Exhaustive algorithms will always find the best possible solution by evaluating every possible path. These algorithms are typically significantly more expensive then the heuristic algorithms discussed next. The exhaustive algorithms implemented so far include:

- Random Paths
- Depth First Search (Brute Force)
- Branch and Bound (Cost)
- Branch and Bound (Cost, Intersections)\*

## Dependencies

These are the main tools used to build this site:

- [gatsbyjs](https://www.gatsbyjs.org)
- [reactjs](https://reactjs.org)
- [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [material-ui](https://material-ui.com/)
- [deck.gl](https://deck.gl/#/)
- [mapbox](https://www.mapbox.com/)

## Contributing

Pull requests are always welcome! Also, feel free to raise any ideas, suggestions, or bugs as an issue.
