import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cloud, Server, Globe, Shield, CheckCircle, AlertCircle, Clock } from "lucide-react"

export function DeploymentAgentContent() {
  const deploymentSteps = [
    { name: "Environment Setup", status: "pending", progress: 0, description: "Configure production environment" },
    { name: "Database Migration", status: "pending", progress: 0, description: "Set up production database" },
    { name: "Frontend Build", status: "pending", progress: 0, description: "Build and optimize React app" },
    { name: "Backend Deployment", status: "pending", progress: 0, description: "Deploy Python API server" },
    { name: "Domain & SSL", status: "pending", progress: 0, description: "Configure domain and SSL certificate" },
  ]

  const environments = [
    { name: "Development", url: "localhost:3000", status: "active", lastDeploy: "2 hours ago" },
    { name: "Staging", url: "staging.myapp.com", status: "inactive", lastDeploy: "Never" },
    { name: "Production", url: "myapp.com", status: "inactive", lastDeploy: "Never" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "in-progress":
        return "text-blue-600 bg-blue-100"
      case "pending":
        return "text-gray-400 bg-gray-100"
      case "active":
        return "text-green-600 bg-green-100"
      case "inactive":
        return "text-gray-400 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "in-progress":
        return Clock
      case "pending":
        return AlertCircle
      case "active":
        return CheckCircle
      case "inactive":
        return AlertCircle
      default:
        return Cloud
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deployment & Infrastructure</h1>
          <p className="text-gray-600">Deploy your application to production environments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Server className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button disabled>
            <Cloud className="w-4 h-4 mr-2" />
            Deploy Now
          </Button>
        </div>
      </div>

      {/* Deployment Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-orange-600" />
            Deployment Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deploymentSteps.map((step, index) => {
              const StatusIcon = getStatusIcon(step.status)
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{step.name}</span>
                      <Badge variant="outline">
                        {step.status === "completed"
                          ? "Complete"
                          : step.status === "in-progress"
                            ? "In Progress"
                            : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    {step.status === "in-progress" && <Progress value={step.progress} className="h-1" />}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Environments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2 text-orange-600" />
            Environments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {environments.map((env, index) => {
              const StatusIcon = getStatusIcon(env.status)
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(env.status)}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{env.name}</div>
                      <div className="text-sm text-gray-500">{env.url}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={env.status === "active" ? "default" : "outline"}>
                      {env.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">Last deploy: {env.lastDeploy}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Overview */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="w-5 h-5 mr-2 text-orange-600" />
              Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Hosting Provider:</span>
                <Badge variant="outline">Vercel</Badge>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <Badge variant="outline">Neon PostgreSQL</Badge>
              </div>
              <div className="flex justify-between">
                <span>CDN:</span>
                <Badge variant="outline">Vercel Edge</Badge>
              </div>
              <div className="flex justify-between">
                <span>Monitoring:</span>
                <Badge variant="outline">Built-in</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-600" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>SSL Certificate:</span>
                <Badge variant="outline">Auto-managed</Badge>
              </div>
              <div className="flex justify-between">
                <span>Environment Variables:</span>
                <Badge variant="outline">Encrypted</Badge>
              </div>
              <div className="flex justify-between">
                <span>API Security:</span>
                <Badge variant="outline">OAuth 2.0</Badge>
              </div>
              <div className="flex justify-between">
                <span>Database Security:</span>
                <Badge variant="outline">Connection Pooling</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
