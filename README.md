[![Netlify Status](https://api.netlify.com/api/v1/badges/e21365cc-96a9-4649-9ad2-a35bb42d4a9f/deploy-status)](https://app.netlify.com/sites/tspvis/deploys)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://tspvis.com)
[![Contributors](https://img.shields.io/github/contributors/jhackshaw/tspvis)](https://github.com/jhackshaw/tspvis/graphs/contributors)
![GitHub](https://img.shields.io/github/license/jhackshaw/tspvis)

  
> [!WARNING]  
> **Seeking maintainers**: If you're qualified and interested in taking over this project, I'd love to hear from you! The analytics suggest it is still helpful to a number of users, but I don't currently have the time to give it the attention it deserves. There's a lot of potential here and I'm looking to transition this to someone interested in making it better. Please shoot me a message if you're interested.

  
# Traveling Salesman Problem

![](https://media.giphy.com/media/LPkQ56C9z0iSv9Hs9D/giphy.gif)

The traveling salesman problem (TSP) asks the question, "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?".

### This project

- Live at [tspvis.com](https://tspvis.com)
- The goal of this site is to be an **educational** resource to help visualize, learn, and develop different algorithms for the traveling salesman problem in a way that's easily accessible
- As you apply different algorithms, the current best path is saved and used as input to whatever you run next. The order in which you apply different algorithms to the problem is sometimes referred to the meta-heuristic strategy.
- For example, apply nearest neighbor, then 2-opt inversion, then branch and bound

### Heuristic algorithms

Heuristic algorithms attempt to find a good approximation of the optimal path within a more _reasonable_ amount of time.

**Construction** - Build a path

- Nearest Neighbor
- Arbitrary Insertion
- Furthest Insertion
- Nearest Insertion
- Convex Hull Insertion\*
- Simulated Annealing\*

**Improvement** - Attempt to take an existing constructed path and improve on it

- 2-Opt Reciprocal Exchange
- 2-Opt Inversion\*

### Exhaustive algorithms

Exhaustive algorithms will always find the best possible solution by evaluating every possible path. These algorithms are typically significantly more expensive then the heuristic algorithms discussed above. The exhaustive algorithms implemented so far include:

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

## Instructions on How to Install

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jhackshaw/tspvis.git
   cd tspvis
   ```

2. **Install libvips**:
   On macOS, you can install libvips using Homebrew:
   ```bash
   brew install vips
   ```

3. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```

4. **Start the development server**:
   To run the project locally, use:
   ```bash
   npm run develop
   ```
   This will start a local development server, typically accessible at `http://localhost:8000`.

5. **Build for production**:
   If you want to create a production build, run:
   ```bash
   npm run build
   ```
   The output will be in the `public/` directory.

6. **Serve the production build**:
   To test the production build locally, use:
   ```bash
   npm run serve
   ```

7. **Clean the cache**:
   If you encounter issues, you can clean the Gatsby cache and public directories:
   ```bash
   npm run clean
   ```
