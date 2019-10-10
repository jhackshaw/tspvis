---
type: introduction
---

### Traveling Salesman Problem

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