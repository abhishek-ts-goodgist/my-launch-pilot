import { PrdAgentContent } from "./PrdAgentContent";
import { BackendAgentContent } from "./BackendAgentContent";
import { FrontendAgentContent } from "./FrontendAgentContent";
import { DeploymentAgentContent } from "./DeploymentAgentContent";

// Update the interface to receive selectedAgent instead of currentProject
interface ContentAreaProps {
  selectedAgent: string;
}

// Replace the entire component content
export function ContentArea({ selectedAgent }: ContentAreaProps) {
  const renderAgentContent = () => {
    switch (selectedAgent) {
      case "prd":
        return <PrdAgentContent />;
      case "backend":
        return <BackendAgentContent />;
      case "frontend":
        return <FrontendAgentContent />;
      case "deployment":
        return <DeploymentAgentContent />;
      default:
        return <PrdAgentContent />;
    }
  };

  return <main className="flex-1 overflow-y-auto">{renderAgentContent()}</main>;
}
