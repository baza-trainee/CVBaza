"use client";

import { useState } from "react";
import {
  CheckCircle,
  CloudUpload,
  FileText,
  Loader2,
  TrendingDown,
  TrendingUp,
  Upload,
  XCircle,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  CVAnalysisFeedback,
  CVAnalysisFormData,
  analyzeCv,
} from "@/app/actions/analyze-cv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CVAnalyzerProps {
  className?: string;
}

export const CVAnalyzer = ({ className }: CVAnalyzerProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<CVAnalysisFeedback | null>(null);

  // React Dropzone configuration
  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        toast.success(`File "${selectedFile.name}" uploaded successfully!`);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  const handleAnalyze = async () => {
    if (!file || !jobTitle.trim()) {
      toast.error("Please provide both a CV file and job title.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const formData: CVAnalysisFormData = {
        companyName: companyName.trim(),
        jobTitle: jobTitle.trim(),
        jobDescription: jobDescription.trim(),
        cvFile: file,
      };

      const result = await analyzeCv(formData, "en");
      setAnalysisResult(result.feedback);
      toast.success("CV analysis completed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze CV. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4" />;
    if (score >= 60) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const renderTips = (
    tips: Array<{ type: "good" | "improve"; tip: string; explanation?: string }>
  ) => {
    return (
      <div className="space-y-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-2">
            {tip.type === "good" ? (
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
            ) : (
              <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{tip.tip}</p>
              {tip.explanation && (
                <p className="mt-1 text-xs text-gray-600">{tip.explanation}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`mx-auto max-w-[75vw] space-y-6 ${className}`}>
      {/* Upload and Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            CV Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload - Dropzone */}
          <div className="space-y-2">
            <Label>Upload CV (PDF)</Label>
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-2">
                {file ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-500" />
                    <p className="text-lg font-medium text-green-700">
                      {file.name}
                    </p>
                    <p className="text-sm text-green-600">
                      File uploaded successfully! Click to change.
                    </p>
                  </>
                ) : isDragActive ? (
                  <>
                    <CloudUpload className="h-12 w-12 text-blue-500" />
                    <p className="text-lg font-medium text-blue-700">
                      Drop your CV here...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400" />
                    <p className="text-lg font-medium text-gray-700">
                      Drag & drop your CV here
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse files
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF files only, max 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div>
            <Label htmlFor="company-name">Company Name (Optional)</Label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., Google, Microsoft"
              className="mt-1"
            />
          </div>

          {/* Job Title */}
          <div>
            <Label htmlFor="job-title">Job Title *</Label>
            <Input
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer, Product Manager"
              className="mt-1"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <Label htmlFor="job-description">Job Description (Optional)</Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for more targeted analysis..."
              className="mt-1 min-h-[100px]"
            />
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !file || !jobTitle.trim()}
              className="w-[20vw] hover:bg-blue-100"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing CV...
                </>
              ) : (
                "Analyze CV"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysisResult && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div
            className={`rounded-lg border p-4 ${getScoreColor(analysisResult.overallScore)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getScoreIcon(analysisResult.overallScore)}
                <h3 className="text-lg font-semibold">Overall Score</h3>
              </div>
              <div className="text-2xl font-bold">
                {analysisResult.overallScore}/100
              </div>
            </div>
          </div>

          {/* ATS Score */}
          <Card>
            <CardHeader>
              <div
                className={`rounded-lg border p-4 ${getScoreColor(analysisResult.ATS.score)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getScoreIcon(analysisResult.ATS.score)}
                    <h3 className="text-lg font-semibold">ATS Compatibility</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {analysisResult.ATS.score}/100
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>{renderTips(analysisResult.ATS.tips)}</CardContent>
          </Card>

          {/* Tone and Style */}
          <Card>
            <CardHeader>
              <div
                className={`rounded-lg border p-4 ${getScoreColor(analysisResult.toneAndStyle.score)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getScoreIcon(analysisResult.toneAndStyle.score)}
                    <h3 className="text-lg font-semibold">Tone & Style</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {analysisResult.toneAndStyle.score}/100
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderTips(analysisResult.toneAndStyle.tips)}
            </CardContent>
          </Card>

          {/* Content Analysis */}
          <Card>
            <CardHeader>
              <div
                className={`rounded-lg border p-4 ${getScoreColor(analysisResult.content.score)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getScoreIcon(analysisResult.content.score)}
                    <h3 className="text-lg font-semibold">Content Analysis</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {analysisResult.content.score}/100
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>{renderTips(analysisResult.content.tips)}</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
