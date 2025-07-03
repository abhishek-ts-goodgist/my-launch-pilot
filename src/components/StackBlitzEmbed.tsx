import { useEffect, useRef, useState } from "react";
import sdk from "@stackblitz/sdk";

interface StackBlitzEmbedProps {
  files: Record<string, string>;
  title?: string;
  description?: string;
  height?: number;
}

const StackBlitzEmbed = ({
  files,
  title = "My Project",
  description = "Generated via SDK",
  height = 600
}: StackBlitzEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && containerRef.current) {
      containerRef.current.innerHTML = "";
      sdk.embedProject(
        containerRef.current,
        {
          title,
          description,
          template: "node",
          files,
          dependencies: {
            react: "latest",
            "react-dom": "latest"
          }
        },
        {
          height,
          openFile: Object.keys(files)[0] || "index.js",
          hideNavigation: false
        }
      );
    }
  }, [isMounted, files, title, description, height]);

  return (
    <div
      ref={containerRef}
      id="stackblitz-container"
      style={{ width: "100%", height, border: "1px solid #ddd" }}
    />
  );
};

export default StackBlitzEmbed;
