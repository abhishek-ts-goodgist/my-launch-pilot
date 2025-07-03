import { useEffect, useRef } from "react";
import sdk from "@stackblitz/sdk";

const StackBlitzFromGitHub = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const embed = () => {
      if (containerRef.current) {
        sdk.embedGithubProject(
          containerRef.current,
          "abhishek-ts-goodgist/my-launch-pilot",
          {
            height: 600,
            openFile: "src/App.tsx", // or src/main.tsx if Vite
            view: 'default',
            theme: "light",
            forceEmbedLayout: true,
            showSidebar: true
          }
        );
      } else {
        console.warn("StackBlitz container is not ready.");
      }
    };

    // Slightly delay the embed to ensure DOM is ready
    const timeout = setTimeout(embed, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "600px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        overflow: "hidden"
      }}
    />
  );
};

export default StackBlitzFromGitHub;
