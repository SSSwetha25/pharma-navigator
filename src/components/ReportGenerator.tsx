import { motion } from "framer-motion";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ResearchReport } from "@/types/agent";
import { generatePDF } from "@/lib/pdfGenerator";
import { useState } from "react";

interface ReportGeneratorProps {
  report: ResearchReport | null;
  isGenerating: boolean;
}

export function ReportGenerator({ report, isGenerating }: ReportGeneratorProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!report) return;
    
    setIsDownloading(true);
    try {
      await generatePDF(report);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setIsDownloading(false);
  };

  if (!report && !isGenerating) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-agent-report/10 border border-agent-report/30">
            <FileText className="h-5 w-5 text-agent-report" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Research Report</h3>
            <p className="text-xs text-muted-foreground">
              {isGenerating 
                ? "Generating report..." 
                : report 
                  ? `Generated ${report.generatedAt.toLocaleTimeString()}`
                  : "Ready to generate"}
            </p>
          </div>
        </div>

        {report && (
          <Button
            onClick={handleDownload}
            variant="glow"
            size="sm"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download PDF
          </Button>
        )}
      </div>

      {report && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-border"
        >
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Report Preview
          </h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Title:</span> {report.title}</p>
            <p className="text-muted-foreground line-clamp-2">{report.executiveSummary}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
