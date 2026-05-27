import React, { useEffect, useRef } from "react";
import mermaid from "mermaid"; // [1], [2]

// 1. Initialize Mermaid
mermaid.initialize({
  startOnLoad: false, // Prevents mermaid from auto-analyzing the page [2]
  theme: "default",
});

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null); // [3]

  // 2. Format and Clean the Diagram Data
  // const autoFixedBadNotes = (diagramData) => {
  //   if (!diagramData) return "";

  //   // Replace line breaks and trim spacing [4], [5]
  //   let clean = diagramData
  //     .replace(/\\r\\n/g, "\n")
  //     .replace(/\\n/g, "\n")
  //     .trim();

  //   // Strip edge labels and characters that commonly break Mermaid parsing
  //   // clean = clean
  //   //   .replace(/-+>\|.*?\|/g, "-->")
  //   //   .replace(/\|/g, " ")
  //   //   .replace(/[()]/g, "")
  //   //   .replace(/\s{2,}/g, " ");

  //   // Ensure it starts as a Top-Down (TD) graph if not specified [6], [5]
  //   if (!clean.startsWith("graph")) {
  //     clean = "graph TD\n" + clean;
  //   }

  //   // Fix Duplicate Nodes Logic
  //   // Uses a Map to track labels and assigns unique indices (e.g., node1[Label]) [7], [8]
  //   let index = 0;
  //   let used = new Map();

  //   /* 
  //     Note: The developer runs a string replacement/regex algorithm here.
  //     If a label already exists in the `used` Map, it returns the existing key (used.get(key)) 
  //     to prevent duplicate node creations. If it's a new label, it increments the index, 
  //     saves the node to the Map (used.set(key, node)), and wraps the label in square brackets. [9], [10], [11], [12]
  //   */
  //   clean = clean.replace(/([a-zA-Z0-9_]+)\s*->/g, (match, key) => {
  //     if (used.has(key)) {
  //       return used.get(key) + " ->"; // Reuse existing node if label is duplicated [9], [10]
  //     } else {
  //       index++;
  //       const node = `${key}${index}[${key}]`; // Create a unique node with an index [11]
  //       used.set(key, node); // Store the mapping of label to node [12]
  //       return node + " ->";
  //     }
  //   });

  //   return clean; // Returns the "safeChart" data [13]
  // };
  const autoFixedBadNotes = (diagramData) => {
    if (!diagramData) return "";

    let clean = diagramData
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .trim();

    if (!clean.startsWith("graph")) {
      clean = "graph TD\n" + clean;
    }

    return clean;
  };

  // 3. Render the SVG
  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagram || !containerRef.current) return; // [14]

      try {
        // Generate a unique ID (random alphanumeric string) [15]
        const uniqueId =
          "mermaid-" + Math.random().toString(36).substring(2, 9);

        // Clean the raw string provided by Gemini [13]
        const safeChart = autoFixedBadNotes(diagram);
        // console.log("Cleaned Mermaid Diagram:", safeChart); // Debug log to verify the cleaned diagram data
        // Render the diagram into an SVG [16]
        const { svg } = await mermaid.render(uniqueId, safeChart);

        // Inject the SVG directly into the DOM container [16]
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.log("Mermaid render failed", error); // [16]
      }
    };

    renderDiagram();
  }, [diagram]); // Re-runs whenever the diagram data changes [17]

  // 4. Return the UI Container
  return (
    <div className="bg-white border rounded-lg px-4 overflow-x-auto">
      {" "}
      {/* [18] */}
      <div ref={containerRef}></div> {/* [3] */}
    </div>
  );
};

export default MermaidSetup;
