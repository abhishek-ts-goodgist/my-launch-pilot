import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StackBlitzEmbed from "../components/StackBlitzEmbed";

// Simulated full codebase structure for StackBlitz visualization
const files = {
  // Entry and config
  "src/App.tsx": `import "./App.css";\nimport { BrowserRouter } from "react-router-dom";\nimport AppRoutes from "./routes/routes";\nfunction App() { return (<BrowserRouter><AppRoutes /></BrowserRouter>); }\nexport default App;`,
  "src/App.css": `#root { width: 100%; min-height: 100vh; }\n.card { padding: 2em; }\n.read-the-docs { color: #888; }`,
  "src/main.tsx": `import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport './index.css';\nimport App from './App.tsx';\ncreateRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);`,
  "src/index.css": "/* Your Tailwind or global CSS here */",
  "src/vite-env.d.ts": "/// <reference types=\"vite/client\" />",
  "package.json": `{"name": "goodgist-copilot-poc", "version": "0.1.0", "dependencies": { "react": "latest", "react-dom": "latest" }}`,
  "vite.config.ts": `// vite config demo\nexport default {};`,
  "tsconfig.json": `// tsconfig placeholder`,
  // API
  "src/api/endpoints.ts": `// endpoints implementation`,
  "src/api/env.ts": `// env logic`,
  "src/api/httpClient.ts": `// http client logic`,
  "src/api/services/projectService.ts": `// project service`,
  "src/api/services/workspaceService.ts": `// workspace service`,
  // Components (ui + app)
  "src/components/StackBlitzEmbed.tsx": `// StackBlitzEmbed logic`,
  "src/components/ui/alert.tsx": `// alert`,
  "src/components/ui/avatar.tsx": `// avatar`,
  "src/components/ui/badge.tsx": `// badge`,
  "src/components/ui/button.tsx": `export function Button() { return <button>Button</button>; }`,
  "src/components/ui/card.tsx": `export function Card() { return <div>Card</div>; }`,
  "src/components/ui/dialog.tsx": `// dialog`,
  "src/components/ui/dropdown-menu.tsx": `// dropdown menu`,
  "src/components/ui/input.tsx": `// input`,
  "src/components/ui/label.tsx": `// label`,
  "src/components/ui/progress.tsx": `// progress`,
  "src/components/ui/resizable.tsx": `// resizable`,
  "src/components/ui/select.tsx": `// select`,
  "src/components/ui/separator.tsx": `// separator`,
  "src/components/ui/sheet.tsx": `// sheet`,
  "src/components/ui/sidebar.tsx": `// sidebar`,
  "src/components/ui/skeleton.tsx": `// skeleton`,
  "src/components/ui/sonner.tsx": `// sonner`,
  "src/components/ui/tabs.tsx": `// tabs`,
  "src/components/ui/tooltip.tsx": `// tooltip`,
  "src/components/ui/typography.tsx": `// typography`,
  // app/* subfolders (examples)
  "src/components/app/AgentContent/BackendAgentContent.tsx": `// BackendAgentContent`,
  "src/components/app/AgentContent/ContentArea.tsx": `// ContentArea`,
  "src/components/app/AgentContent/DeploymentAgentContent.tsx": `// DeploymentAgentContent`,
  "src/components/app/AgentContent/FrontendAgentContent.tsx": `// FrontendAgentContent`,
  "src/components/app/AgentContent/PrdAgentContent.tsx": `// PrdAgentContent`,
  "src/components/app/AppHeader/AppHeader.tsx": `// AppHeader`,
  "src/components/app/AppSidebar/ChatSidebar.tsx": `// ChatSidebar`,
  "src/components/app/BaseLayout/BaseLayout.tsx": `// BaseLayout`,
  "src/components/app/Login/Login.tsx": `// Login`,
  // Hooks
  "src/hooks/use-mobile.ts": `// use-mobile hook`,
  "src/hooks/useKnowledgeBase.ts": `// useKnowledgeBase hook`,
  "src/hooks/useMessage.ts": `// useMessage hook`,
  "src/hooks/useProject.ts": `// useProject hook`,
  "src/hooks/useWorkspace.ts": `// useWorkspace hook`,
  // lib
  "src/lib/utils.ts": `// utility functions`,
  // Routes
  "src/routes/Routes.tsx": `// App routes file`,
  "src/routes/ChatPOC.tsx": `// Chat POC`,
  "src/routes/ProtectedRoute.tsx": `// Protected Route logic`,
  "src/routes/StackblitzPOC.tsx": `// StackblitzPOC`,
  // Services
  "src/services/authService.ts": `// authService`,
  "src/services/knowledgeBaseService.ts": `// knowledgeBaseService`,
  "src/services/messageService.ts": `// messageService`,
  "src/services/projectService.ts": `// projectService`,
  "src/services/workspaceService.ts": `// workspaceService`,
  // Stores
  "src/stores/knowledgeBaseStore.ts": `// knowledgeBaseStore`,
  "src/stores/loginStore.ts": `// loginStore`,
  "src/stores/messageStore.ts": `// messageStore`,
  "src/stores/projectStore.ts": `// projectStore`,
  "src/stores/workspaceStore.ts": `// workspaceStore`,
  // Types
  "src/types/knowledgeBase.ts": `// knowledgeBase types`,
  "src/types/message.ts": `// message types`,
  "src/types/project.ts": `// project types`,
  "src/types/workspace.ts": `// workspace types`,
};

const StackblitzPOC: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Stackblitz: Visualize Goodgist-Copilot Codebase Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <StackBlitzEmbed files={files} title="Goodgist-Copilot" description="Full file/folder structure visualization" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StackblitzPOC;
