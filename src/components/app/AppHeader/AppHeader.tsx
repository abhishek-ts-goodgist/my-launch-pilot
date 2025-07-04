"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useLoginStore from "@/stores/loginStore";
// Utility to get initials from email
function getInitials(email?: string) {
  if (!email) return "";
  // Extract username before @
  const [username] = email.split("@");
  // Remove non-letters, then take first 2 letters, uppercase
  const lettersOnly = username.replace(/[^a-zA-Z]/g, "");
  return lettersOnly.substring(0, 2).toUpperCase();
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Rocket,
  Settings,
  Bell,
  Plus,
  ChevronDown,
  FolderPlus,
  Users,
  Building,
} from "lucide-react";

interface Workspace {
  id: string;
  name: string;
  type: string;
  projectCount: number;
  icon: any;
  members?: number;
}

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  currentStep: string;
}

export function Header() {
  const [selectedWorkspace, setSelectedWorkspace] = useState("personal");
  const [selectedProject, setSelectedProject] = useState("social-dashboard");
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const { isLoggedIn, user } = useLoginStore();

  // Mock data for workspaces
  const workspaces: Workspace[] = [
    {
      id: "personal",
      name: "Personal",
      type: "personal",
      projectCount: 3,
      icon: Users,
    },
    {
      id: "startup-co",
      name: "StartupCo",
      type: "team",
      projectCount: 8,
      icon: Building,
      members: 5,
    },
    {
      id: "freelance",
      name: "Freelance",
      type: "personal",
      projectCount: 2,
      icon: Users,
    },
  ];

  // Mock data for projects by workspace
  const projectsByWorkspace: Record<string, Project[]> = {
    personal: [
      {
        id: "social-dashboard",
        name: "Social Media Dashboard",
        status: "In Progress",
        progress: 15,
        currentStep: "PRD Generation",
      },
      {
        id: "portfolio-site",
        name: "Portfolio Website",
        status: "Planning",
        progress: 5,
        currentStep: "PRD Generation",
      },
      {
        id: "expense-tracker",
        name: "Expense Tracker",
        status: "Review",
        progress: 90,
        currentStep: "Deployment",
      },
    ],
    "startup-co": [
      {
        id: "crm-system",
        name: "CRM System",
        status: "In Progress",
        progress: 60,
        currentStep: "API Development",
      },
      {
        id: "mobile-app",
        name: "Mobile App MVP",
        status: "In Progress",
        progress: 40,
        currentStep: "UI Development",
      },
    ],
    freelance: [
      {
        id: "client-portal",
        name: "Client Portal",
        status: "Planning",
        progress: 10,
        currentStep: "PRD Generation",
      },
    ],
  };

  const currentWorkspace = workspaces.find((w) => w.id === selectedWorkspace);
  const currentProjects = projectsByWorkspace[selectedWorkspace] || [];
  const currentProject = currentProjects.find((p) => p.id === selectedProject);

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    // Reset selected project when changing workspace
    const newProjects = projectsByWorkspace[workspaceId] || [];
    if (newProjects.length > 0) {
      setSelectedProject(newProjects[0].id);
    } else {
      setSelectedProject("");
    }
  };

  const handleCreateWorkspace = () => {
    if (newWorkspaceName.trim()) {
      // Add the new workspace to the workspaces array
      const newWorkspace = {
        id: newWorkspaceName.toLowerCase().replace(/\s+/g, "-"),
        name: newWorkspaceName,
        type: "personal",
        projectCount: 0,
        icon: Users,
      };
      // In a real app, you'd update this via state management or API
      console.log("Creating workspace:", newWorkspace);
      setSelectedWorkspace(newWorkspace.id);
      setShowNewWorkspaceDialog(false);
      setNewWorkspaceName("");
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      // Add the new project to the current workspace
      const newProject = {
        id: newProjectName.toLowerCase().replace(/\s+/g, "-"),
        name: newProjectName,
        status: "Planning",
        progress: 0,
        currentStep: "PRD Generation",
      };
      // In a real app, you'd update this via state management or API
      console.log("Creating project:", newProject);
      setSelectedProject(newProject.id);
      setShowNewProjectDialog(false);
      setNewProjectName("");
    }
  };

  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LaunchPilot
              </span>
            </div>

            {/* Compact Workspace/Project Selector */}
            <div className="flex items-center space-x-2 text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    {currentWorkspace && (
                      <currentWorkspace.icon className="w-3 h-3 mr-1" />
                    )}

                    <span className="max-w-20 truncate">
                      {currentWorkspace?.name}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {workspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onClick={() => handleWorkspaceChange(workspace.id)}
                    >
                      <workspace.icon className="w-4 h-4 mr-2" />
                      {workspace.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowNewWorkspaceDialog(true)}
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    New Workspace
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-gray-400">/</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <span className="max-w-32 truncate">
                      {currentProject?.name || "Select Project"}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Projects</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentProjects.map((project) => (
                    <DropdownMenuItem
                      key={project.id}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{project.name}</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          {project.progress}%
                        </Badge>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowNewProjectDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-7 h-7">
              <AvatarImage src="/placeholder.svg?height=28&width=28" />
              {isLoggedIn && user?.email ? (
                <AvatarFallback className="text-xs">
                  {getInitials(user.email)}
                </AvatarFallback>
              ) : null}
            </Avatar>
          </div>
        </div>
      </header>

      {/* New Workspace Dialog */}
      <Dialog
        open={showNewWorkspaceDialog}
        onOpenChange={setShowNewWorkspaceDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to organize your projects.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workspace-name" className="text-right">
                Name
              </Label>
              <Input
                id="workspace-name"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="col-span-3"
                placeholder="My Workspace"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateWorkspace();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateWorkspace}
              disabled={!newWorkspaceName.trim()}
            >
              Create Workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Project Dialog */}
      <Dialog
        open={showNewProjectDialog}
        onOpenChange={setShowNewProjectDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Create a new project in {currentWorkspace?.name} workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-name" className="text-right">
                Name
              </Label>
              <Input
                id="project-name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="col-span-3"
                placeholder="My Project"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateProject();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
