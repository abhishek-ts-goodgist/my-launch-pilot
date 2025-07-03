import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Download,
  ChevronDown,
  CheckCircle2,
  History,
  Eye,
  Share,
} from "lucide-react";

interface PRDVersion {
  id: string;
  version: string;
  date: string;
  status: "draft" | "review" | "approved";
  completionPercentage: number;
  changes: string;
}

export function PrdAgentContent() {
  const [selectedVersion, setSelectedVersion] = useState("v1.2");

  const prdVersions: PRDVersion[] = [
    {
      id: "v1.2",
      version: "v1.2",
      date: "2024-01-15",
      status: "approved",
      completionPercentage: 95,
      changes: "Added API specifications and user stories",
    },
    {
      id: "v1.1",
      version: "v1.1",
      date: "2024-01-12",
      status: "review",
      completionPercentage: 80,
      changes: "Updated technical requirements and architecture",
    },
    {
      id: "v1.0",
      version: "v1.0",
      date: "2024-01-10",
      status: "draft",
      completionPercentage: 60,
      changes: "Initial PRD with core features and overview",
    },
  ];

  const currentVersion =
    prdVersions.find((v) => v.id === selectedVersion) || prdVersions[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle2;
      case "review":
        return Eye;
      case "draft":
        return FileText;
      default:
        return FileText;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Product Requirements Document
                </h1>
                <p className="text-sm text-gray-500">
                  Social Media Dashboard Project
                </p>
              </div>
            </div>

            {/* Version Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-4 bg-transparent">
                  <History className="w-4 h-4 mr-2" />
                  {currentVersion.version}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 mb-2">
                    VERSION HISTORY
                  </div>
                  {prdVersions.map((version) => {
                    const StatusIcon = getStatusIcon(version.status);
                    return (
                      <DropdownMenuItem
                        key={version.id}
                        onClick={() => setSelectedVersion(version.id)}
                        className="p-3 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <StatusIcon className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {version.version}
                              </span>
                              <Badge
                                className={`text-xs ${getStatusColor(
                                  version.status
                                )}`}
                              >
                                {version.status}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {version.changes}
                            </div>
                            <div className="text-xs text-gray-400">
                              {version.date}
                            </div>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Badge
              className={`${getStatusColor(currentVersion.status)} px-3 py-1`}
            >
              {currentVersion.status.toUpperCase()}
            </Badge>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Completion Progress
            </span>
            <span className="text-sm text-gray-600">
              {currentVersion.completionPercentage}%
            </span>
          </div>
          <Progress
            value={currentVersion.completionPercentage}
            className="h-2"
          />
        </div>
      </div>

      {/* Document Viewer */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white shadow-sm border-x min-h-full">
            {/* Document Content */}
            <div className="p-12 space-y-8">
              {/* Document Header */}
              <div className="border-b pb-8">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Product Requirements Document
                  </h1>
                  <h2 className="text-xl text-gray-600">
                    Social Media Dashboard Platform
                  </h2>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mt-4">
                    <span>Version {currentVersion.version}</span>
                    <span>•</span>
                    <span>{currentVersion.date}</span>
                    <span>•</span>
                    <span className="capitalize">{currentVersion.status}</span>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>1. Executive Summary</span>
                      <span className="text-gray-400">Page 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2. Project Overview</span>
                      <span className="text-gray-400">Page 3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Core Features</span>
                      <span className="text-gray-400">Page 4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4. User Stories</span>
                      <span className="text-gray-400">Page 6</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>5. Technical Requirements</span>
                      <span className="text-gray-400">Page 8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6. API Specifications</span>
                      <span className="text-gray-400">Page 10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>7. Success Metrics</span>
                      <span className="text-gray-400">Page 12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>8. Timeline & Milestones</span>
                      <span className="text-gray-400">Page 13</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                  1. Executive Summary
                </h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    The Social Media Dashboard Platform is a comprehensive web
                    application designed to centralize social media management
                    across multiple platforms including Twitter, Instagram,
                    Facebook, and LinkedIn.
                  </p>
                  <p>
                    This platform will enable users to monitor analytics,
                    schedule posts, manage multiple accounts, and generate
                    detailed performance reports from a single, unified
                    interface. The solution addresses the growing need for
                    businesses and content creators to efficiently manage their
                    social media presence without switching between multiple
                    platforms.
                  </p>
                </div>
              </section>

              {/* Project Overview */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                  2. Project Overview
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Problem Statement
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Social media managers and content creators currently
                      struggle with fragmented workflows, switching between
                      multiple platforms to monitor performance, engage with
                      audiences, and schedule content. This leads to
                      inefficiency and missed opportunities.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Solution
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      A unified dashboard that aggregates data from multiple
                      social media platforms, provides real-time analytics,
                      enables cross-platform posting, and offers intelligent
                      insights to optimize social media strategy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Core Features */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                  3. Core Features
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      🔐 Multi-Platform Authentication
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • OAuth 2.0 integration with Twitter, Instagram,
                        Facebook, LinkedIn
                      </li>
                      <li>• Secure token management and refresh mechanisms</li>
                      <li>• Account connection status monitoring</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                      📊 Real-time Analytics Dashboard
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • Unified metrics view across all connected platforms
                      </li>
                      <li>• Customizable widgets and data visualization</li>
                      <li>• Performance trending and comparative analysis</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">
                      📅 Cross-Platform Posting
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        • Schedule posts across multiple platforms
                        simultaneously
                      </li>
                      <li>• Platform-specific content optimization</li>
                      <li>• Bulk upload and content calendar management</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Technical Requirements */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                  5. Technical Requirements
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Frontend Stack
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          • <strong>Framework:</strong> React 18 with TypeScript
                        </li>
                        <li>
                          • <strong>Styling:</strong> Tailwind CSS + shadcn/ui
                        </li>
                        <li>
                          • <strong>State Management:</strong> Zustand
                        </li>
                        <li>
                          • <strong>Charts:</strong> Recharts for data
                          visualization
                        </li>
                        <li>
                          • <strong>Build Tool:</strong> Vite
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Backend Stack
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          • <strong>Framework:</strong> Python FastAPI
                        </li>
                        <li>
                          • <strong>Database:</strong> PostgreSQL with
                          SQLAlchemy
                        </li>
                        <li>
                          • <strong>Cache:</strong> Redis for session management
                        </li>
                        <li>
                          • <strong>Authentication:</strong> OAuth 2.0 + JWT
                        </li>
                        <li>
                          • <strong>API Documentation:</strong> OpenAPI/Swagger
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Success Metrics */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                  7. Success Metrics
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Platform Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      &lt;2s
                    </div>
                    <div className="text-sm text-gray-600">
                      Dashboard Load Time
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      1000+
                    </div>
                    <div className="text-sm text-gray-600">
                      Active Users (Month 1)
                    </div>
                  </div>
                </div>
              </section>

              {/* Document Footer */}
              <div className="border-t pt-8 mt-12 text-center text-sm text-gray-500">
                <p>
                  This document was generated by LaunchPilot AI •{" "}
                  {currentVersion.date}
                </p>
                <p className="mt-1">Confidential and Proprietary</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
