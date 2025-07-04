"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  ChevronDown,
  User,
  FileText,
  Database,
  Layout,
  Cloud,
} from "lucide-react";

interface Agent {
  name: string;
  icon: any;
  color: string;
  bgColor: string;
}

interface ChatMessage {
  id: number;
  type: "user" | "assistant";
  message: string;
  timestamp: string;
  isGenerating?: boolean;
}

// Add selectedAgent to the props interface and pass it up to parent
interface ChatSidebarProps {
  selectedAgent: string;
  onAgentChange: (agent: string) => void;
}

// Update the component signature
export function ChatSidebar({
  selectedAgent,
  onAgentChange,
}: ChatSidebarProps) {
  const TEXTBOX_MAX_VARIABLE_HEIGHT = 300;
  const [currentMessage, setCurrentMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock data for agents
  const agents: Record<string, Agent> = {
    prd: {
      name: "PRD Agent",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    backend: {
      name: "Backend Agent",
      icon: Database,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    frontend: {
      name: "Frontend Agent",
      icon: Layout,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    deployment: {
      name: "Deployment Agent",
      icon: Cloud,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  };

  // Mock data for chat history
  const chatHistory: ChatMessage[] = [
    {
      id: 1,
      type: "user",
      message:
        "I want to build a social media dashboard that shows analytics from multiple platforms",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "assistant",
      message:
        "Great idea! I'll help you build a social media dashboard. Let me start by creating a comprehensive PRD. Can you tell me which social media platforms you want to integrate with?",
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      type: "user",
      message:
        "I want to integrate with Twitter, Instagram, Facebook, and LinkedIn",
      timestamp: "10:32 AM",
    },
    {
      id: 4,
      type: "assistant",
      message:
        "Perfect! I'm now generating the PRD for your social media dashboard with Twitter, Instagram, Facebook, and LinkedIn integrations. This will include:\n\n• User authentication and platform connections\n• Real-time analytics dashboard\n• Data visualization components\n• Multi-platform posting capabilities\n\nI'm currently working on the technical specifications. What's your target audience for this dashboard?",
      timestamp: "10:33 AM",
      isGenerating: false,
    },
  ];

  const currentAgent = agents[selectedAgent];

  // Auto-resize textarea function
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Calculate the new height
      const newHeight = Math.min(
        textarea.scrollHeight,
        TEXTBOX_MAX_VARIABLE_HEIGHT
      ); // Max height of TEXTBOX_MAX_VARIABLE_HEIGHT
      textarea.style.height = `${newHeight}px`;
    }
  };

  // Handle textarea input
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
    adjustTextareaHeight();
  };

  // Adjust height on mount and when content changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [currentMessage]);

  return (
    <aside className="bg-white border-r flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">AI Agents</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Reset
          </Button>
        </div>

        {/* Agent Selection */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-transparent"
            >
              <div className="flex items-center">
                <currentAgent.icon
                  className={`w-4 h-4 mr-2 ${currentAgent.color}`}
                />
                {currentAgent.name}
              </div>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Select AI Agent</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(agents).map(([key, agent]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onAgentChange(key)}
                className="p-3"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${agent.bgColor}`}
                  >
                    <agent.icon className={`w-4 h-4 ${agent.color}`} />
                  </div>
                  <div className="font-medium">{agent.name}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {chatHistory.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "user" ? "bg-blue-100" : currentAgent.bgColor
              }`}
            >
              {message.type === "user" ? (
                <User className="w-4 h-4 text-blue-600" />
              ) : (
                <currentAgent.icon
                  className={`w-4 h-4 ${currentAgent.color}`}
                />
              )}
            </div>
            <div
              className={`flex-1 ${
                message.type === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-[85%] ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t flex-shrink-0">
        <div className="relative border border-border rounded-md bg-background">
          <textarea
            ref={textareaRef}
            placeholder="Describe what you want to build, modify, or ask questions..."
            value={currentMessage}
            onChange={handleTextareaChange}
            className={`w-full resize-none bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] max-h-[${TEXTBOX_MAX_VARIABLE_HEIGHT}px] overflow-y-auto`}
            style={{
              transition: "height 0.1s ease-out",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // Handle send message
              }
            }}
          />
          {/* Footer for input actions */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1 bg-white -mt-1 rounded-b-md">
            <span className="text-[10px] text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">
                {currentMessage.length}/2000
              </span>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 w-8 ml-1 p-0 flex-shrink-0"
                disabled={!currentMessage.trim()}
                tabIndex={0}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
