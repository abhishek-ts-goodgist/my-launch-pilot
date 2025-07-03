import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout, Palette, Eye, Code, Smartphone, Monitor } from "lucide-react"

export function FrontendAgentContent() {
  const components = [
    { name: "Dashboard", status: "completed", type: "Page", responsive: true },
    { name: "Analytics Chart", status: "in-progress", type: "Component", responsive: true },
    { name: "Post Scheduler", status: "pending", type: "Component", responsive: false },
    { name: "Platform Connector", status: "pending", type: "Component", responsive: true },
  ]

  const designSystem = {
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },
    typography: {
      heading: "Inter",
      body: "Inter",
      mono: "JetBrains Mono",
    },
    spacing: "Tailwind CSS (4px base)",
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frontend Development</h1>
          <p className="text-gray-600">React components, UI design, and user experience</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Code className="w-4 h-4 mr-2" />
            View Code
          </Button>
        </div>
      </div>

      <Tabs defaultValue="components" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="design">Design System</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="w-5 h-5 mr-2 text-blue-600" />
                React Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {components.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Layout className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-gray-500">{component.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {component.responsive && (
                        <div className="flex items-center space-x-1">
                          <Smartphone className="w-3 h-3 text-gray-400" />
                          <Monitor className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <Badge
                        variant={
                          component.status === "completed"
                            ? "default"
                            : component.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {component.status === "completed"
                          ? "Ready"
                          : component.status === "in-progress"
                            ? "Building"
                            : "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-blue-600" />
                  Color Palette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(designSystem.colors).map(([name, color]) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="capitalize">{name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded border" style={{ backgroundColor: color }} />
                        <code className="text-sm">{color}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography & Spacing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Fonts</h4>
                    <div className="space-y-1 text-sm">
                      <div>Heading: {designSystem.typography.heading}</div>
                      <div>Body: {designSystem.typography.body}</div>
                      <div>Mono: {designSystem.typography.mono}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Spacing</h4>
                    <div className="text-sm">{designSystem.spacing}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Layout className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">Interactive preview will be available once components are built</p>
                  <Button variant="outline" disabled>
                    <Eye className="w-4 h-4 mr-2" />
                    Launch Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
