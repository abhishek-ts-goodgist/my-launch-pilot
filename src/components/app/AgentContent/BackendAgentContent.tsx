import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Server,
  Code,
  Play,
  Settings,
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Copy,
  Download,
} from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
  status?: "completed" | "in-progress" | "pending";
  content?: string;
  language?: string;
}

export function BackendAgentContent() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["app", "app/routers", "app/models"])
  );
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [showCodeDialog, setShowCodeDialog] = useState(false);

  const projectStructure: FileNode[] = [
    {
      name: "social-media-backend",
      type: "folder",
      path: "social-media-backend",
      children: [
        {
          name: "app",
          type: "folder",
          path: "app",
          children: [
            {
              name: "main.py",
              type: "file",
              path: "app/main.py",
              status: "completed",
              language: "python",
              content: `from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
import uvicorn

from app.routers import auth, analytics, posts, platforms
from app.database import engine, Base
from app.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Social Media Dashboard API",
    description="Backend API for social media management platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])
app.include_router(posts.router, prefix="/api/v1/posts", tags=["posts"])
app.include_router(platforms.router, prefix="/api/v1/platforms", tags=["platforms"])

@app.get("/")
async def root():
    return {"message": "Social Media Dashboard API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)`,
            },
            {
              name: "config.py",
              type: "file",
              path: "app/config.py",
              status: "completed",
              language: "python",
              content: `from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/social_dashboard"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "https://yourdomain.com"]
    
    # Social Media APIs
    TWITTER_API_KEY: str = ""
    TWITTER_API_SECRET: str = ""
    FACEBOOK_APP_ID: str = ""
    FACEBOOK_APP_SECRET: str = ""
    INSTAGRAM_CLIENT_ID: str = ""
    INSTAGRAM_CLIENT_SECRET: str = ""
    LINKEDIN_CLIENT_ID: str = ""
    LINKEDIN_CLIENT_SECRET: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()`,
            },
            {
              name: "database.py",
              type: "file",
              path: "app/database.py",
              status: "completed",
              language: "python",
              content: `from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`,
            },
            {
              name: "models",
              type: "folder",
              path: "app/models",
              children: [
                {
                  name: "__init__.py",
                  type: "file",
                  path: "app/models/__init__.py",
                  status: "completed",
                  language: "python",
                  content: `from .user import User
from .social_account import SocialAccount
from .post import Post
from .analytics import Analytics

__all__ = ["User", "SocialAccount", "Post", "Analytics"]`,
                },
                {
                  name: "user.py",
                  type: "file",
                  path: "app/models/user.py",
                  status: "completed",
                  language: "python",
                  content: `from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    social_accounts = relationship("SocialAccount", back_populates="user")
    posts = relationship("Post", back_populates="user")`,
                },
                {
                  name: "social_account.py",
                  type: "file",
                  path: "app/models/social_account.py",
                  status: "in-progress",
                  language: "python",
                  content: `from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class SocialAccount(Base):
    __tablename__ = "social_accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    platform = Column(String, nullable=False)  # twitter, instagram, facebook, linkedin
    platform_user_id = Column(String, nullable=False)
    username = Column(String, nullable=False)
    display_name = Column(String)
    access_token = Column(Text, nullable=False)
    refresh_token = Column(Text)
    token_expires_at = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="social_accounts")
    posts = relationship("Post", back_populates="social_account")`,
                },
                {
                  name: "post.py",
                  type: "file",
                  path: "app/models/post.py",
                  status: "pending",
                  language: "python",
                  content: `# Post model implementation pending...`,
                },
              ],
            },
            {
              name: "routers",
              type: "folder",
              path: "app/routers",
              children: [
                {
                  name: "__init__.py",
                  type: "file",
                  path: "app/routers/__init__.py",
                  status: "completed",
                  language: "python",
                  content: `# Router package initialization`,
                },
                {
                  name: "auth.py",
                  type: "file",
                  path: "app/routers/auth.py",
                  status: "completed",
                  language: "python",
                  content: `from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.database import get_db
from app.models.user import User
from app.config import settings

router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}`,
                },
                {
                  name: "analytics.py",
                  type: "file",
                  path: "app/routers/analytics.py",
                  status: "in-progress",
                  language: "python",
                  content: `from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from app.database import get_db
from app.models.user import User
from app.models.analytics import Analytics

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_analytics(
    user_id: int,
    days: Optional[int] = 30,
    db: Session = Depends(get_db)
):
    """Get dashboard analytics for the specified user and time period"""
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    # Implementation in progress...
    return {
        "message": "Analytics endpoint in development",
        "user_id": user_id,
        "period": f"{days} days"
    }`,
                },
                {
                  name: "posts.py",
                  type: "file",
                  path: "app/routers/posts.py",
                  status: "pending",
                  language: "python",
                  content: `# Posts router implementation pending...`,
                },
                {
                  name: "platforms.py",
                  type: "file",
                  path: "app/routers/platforms.py",
                  status: "pending",
                  language: "python",
                  content: `# Platforms router implementation pending...`,
                },
              ],
            },
            {
              name: "services",
              type: "folder",
              path: "app/services",
              children: [
                {
                  name: "__init__.py",
                  type: "file",
                  path: "app/services/__init__.py",
                  status: "completed",
                  language: "python",
                  content: `# Services package initialization`,
                },
                {
                  name: "social_media.py",
                  type: "file",
                  path: "app/services/social_media.py",
                  status: "pending",
                  language: "python",
                  content: `# Social media service implementation pending...`,
                },
              ],
            },
          ],
        },
        {
          name: "requirements.txt",
          type: "file",
          path: "requirements.txt",
          status: "completed",
          language: "text",
          content: `fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
redis==5.0.1
pydantic-settings==2.0.3
requests==2.31.0
python-dotenv==1.0.0`,
        },
        {
          name: ".env.example",
          type: "file",
          path: ".env.example",
          status: "completed",
          language: "text",
          content: `DATABASE_URL=postgresql://user:password@localhost/social_dashboard
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret`,
        },
        {
          name: "README.md",
          type: "file",
          path: "README.md",
          status: "completed",
          language: "markdown",
          content: `# Social Media Dashboard Backend

A FastAPI-based backend for managing social media accounts and analytics.

## Features

- Multi-platform social media integration
- Real-time analytics and reporting
- Secure authentication with JWT
- RESTful API design
- PostgreSQL database with SQLAlchemy ORM

## Setup

1. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

3. Run the application:
   \`\`\`bash
   uvicorn app.main:app --reload
   \`\`\`

## API Documentation

Visit \`http://localhost:8000/docs\` for interactive API documentation.`,
        },
      ],
    },
  ];

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (file: FileNode) => {
    if (file.type === "file" && file.content) {
      setSelectedFile(file);
      setShowCodeDialog(true);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in-progress":
        return "text-blue-600";
      case "pending":
        return "text-gray-400";
      default:
        return "text-gray-600";
    }
  };

  const getFileIcon = (file: FileNode) => {
    if (file.type === "folder") {
      return expandedFolders.has(file.path) ? FolderOpen : Folder;
    }
    return FileText;
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const Icon = getFileIcon(node);
      const isExpanded = expandedFolders.has(node.path);

      return (
        <div key={node.path}>
          <div
            className={`flex items-center space-x-2 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer ${
              depth > 0 ? `ml-${depth * 4}` : ""
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() =>
              node.type === "folder"
                ? toggleFolder(node.path)
                : handleFileClick(node)
            }
          >
            {node.type === "folder" && (
              <div className="w-4 h-4 flex items-center justify-center">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                )}
              </div>
            )}
            <Icon className={`w-4 h-4 ${getStatusColor(node.status)}`} />
            <span
              className={`text-sm ${getStatusColor(node.status)} ${
                node.type === "file" ? "hover:text-blue-600" : ""
              }`}
            >
              {node.name}
            </span>
            {node.status && (
              <Badge
                variant="outline"
                className={`text-xs h-4 ${
                  node.status === "completed"
                    ? "border-green-200 text-green-700"
                    : node.status === "in-progress"
                    ? "border-blue-200 text-blue-700"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {node.status === "completed"
                  ? "✓"
                  : node.status === "in-progress"
                  ? "⏳"
                  : "⏸"}
              </Badge>
            )}
          </div>
          {node.type === "folder" && isExpanded && node.children && (
            <div>{renderFileTree(node.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Backend Development
          </h1>
          <p className="text-gray-600">
            Python FastAPI project structure and implementation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Play className="w-4 h-4 mr-2" />
            Run Server
          </Button>
        </div>
      </div>

      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="structure">Project Structure</TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2 text-green-600" />
                Python Project Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
                {renderFileTree(projectStructure)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-green-600" />
                API Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    method: "POST",
                    path: "/api/v1/auth/login",
                    status: "completed",
                    description: "User authentication",
                  },
                  {
                    method: "GET",
                    path: "/api/v1/analytics/dashboard",
                    status: "in-progress",
                    description: "Dashboard analytics",
                  },
                  {
                    method: "POST",
                    path: "/api/v1/posts/schedule",
                    status: "pending",
                    description: "Schedule posts",
                  },
                  {
                    method: "GET",
                    path: "/api/v1/platforms/status",
                    status: "pending",
                    description: "Platform status",
                  },
                ].map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Badge
                        className={`${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                      <span className="text-sm text-gray-600">
                        {endpoint.description}
                      </span>
                    </div>
                    <Badge
                      variant={
                        endpoint.status === "completed"
                          ? "default"
                          : endpoint.status === "in-progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {endpoint.status === "completed"
                        ? "Ready"
                        : endpoint.status === "in-progress"
                        ? "Building"
                        : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-green-600" />
                Database Schema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "users",
                    status: "completed",
                    columns: 8,
                    description: "User accounts and profiles",
                  },
                  {
                    name: "social_accounts",
                    status: "completed",
                    columns: 6,
                    description: "Connected social media accounts",
                  },
                  {
                    name: "posts",
                    status: "in-progress",
                    columns: 12,
                    description: "Scheduled and published posts",
                  },
                  {
                    name: "analytics",
                    status: "pending",
                    columns: 15,
                    description: "Analytics and metrics data",
                  },
                ].map((table, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Database className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="font-medium">{table.name}</div>
                        <div className="text-sm text-gray-500">
                          {table.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {table.columns} columns
                      </span>
                      <Badge
                        variant={
                          table.status === "completed"
                            ? "default"
                            : table.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {table.status === "completed"
                          ? "Created"
                          : table.status === "in-progress"
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
      </Tabs>

      {/* Code Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{selectedFile?.path}</span>
                {selectedFile?.status && (
                  <Badge
                    variant="outline"
                    className={getStatusColor(selectedFile.status)}
                  >
                    {selectedFile.status}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    selectedFile?.content &&
                    copyToClipboard(selectedFile.content)
                  }
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh]">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{selectedFile?.content}</code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
