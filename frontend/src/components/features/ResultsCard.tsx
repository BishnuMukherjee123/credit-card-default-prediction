import './features.css'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RiskMeter } from "./RiskMeter";
import { type PredictionResult } from "@/types";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface ResultsCardProps {
  result: PredictionResult;
}

export const ResultsCard = ({ result }: ResultsCardProps) => {
  const getIcon = () => {
    if (result.riskLevel === 'low') return <CheckCircle className="h-6 w-6 text-green-400" />;
    if (result.riskLevel === 'medium') return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
    return <AlertCircle className="h-6 w-6 text-red-400" />;
  };

  const getRecommendation = () => {
    if (result.riskLevel === 'low') {
      return "This customer shows low default risk. Credit can be extended with standard terms.";
    }
    if (result.riskLevel === 'medium') {
      return "This customer shows moderate default risk. Consider additional verification or adjusted terms.";
    }
    return "This customer shows high default risk. Recommend declining or requiring additional collateral.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getIcon()}
            Prediction Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RiskMeter 
            probability={result.probability} 
            riskLevel={result.riskLevel}
          />

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-neutral-900/50 border border-border/30">
              <div className="text-sm text-neutral-400 mb-2">Recommendation</div>
              <div className="text-neutral-200">{getRecommendation()}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-neutral-900/50 border border-border/30">
                <div className="text-sm text-neutral-400 mb-1">Prediction</div>
                <div className="text-2xl font-bold">
                  {result.prediction === 1 ? 'Default' : 'No Default'}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-neutral-900/50 border border-border/30">
                <div className="text-sm text-neutral-400 mb-1">Confidence</div>
                <div className="text-2xl font-bold">
                  {Math.round(result.probability * 100)}%
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-500 text-center">
              Prediction ID: {result.id} • {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
