// src/components/app/Layout.tsx

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useState } from "react";
import { ChatSidebar } from "../AppSidebar/ChatSidebar";
import { ContentArea } from "../AgentContent/ContentArea";
import { Header } from "../AppHeader/AppHeader";

export function BaseLayout() {
  const [selectedAgent, setSelectedAgent] = useState("prd");

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel
            defaultSize={25}
            minSize={25}
            maxSize={50}
            className="min-w-[320px]"
          >
            <ChatSidebar
              selectedAgent={selectedAgent}
              onAgentChange={setSelectedAgent}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75} minSize={50}>
            <ContentArea selectedAgent={selectedAgent} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
