import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StackBlitzFromGitHub from "../components/StackBlitzFromGitHub";

const StackblitzGithubPOC: React.FC = () => (
  <div className="flex flex-col items-center mt-8">
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>StackBlitz from GitHub Repo</CardTitle>
      </CardHeader>
      <CardContent>
        <StackBlitzFromGitHub />
      </CardContent>
    </Card>
  </div>
);

export default StackblitzGithubPOC;
