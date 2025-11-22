import './features.css'
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Tabs } from "../aceternity/AnimatedTabs";
import { type PredictionInput } from "@/types";
import { Loader2 } from "lucide-react";

interface PredictionFormProps {
  onSubmit: (data: PredictionInput) => Promise<void>;
  isLoading: boolean;
}

export const PredictionForm = ({ onSubmit, isLoading }: PredictionFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<PredictionInput>({
    limit_bal: 50000,
    sex: 1,
    education: 2,
    marriage: 1,
    age: 30,
    pay_0: 0,
    pay_2: 0,
    pay_3: 0,
    pay_4: 0,
    pay_5: 0,
    pay_6: 0,
    bill_amt1: 0,
    bill_amt2: 0,
    bill_amt3: 0,
    bill_amt4: 0,
    bill_amt5: 0,
    bill_amt6: 0,
    pay_amt1: 0,
    pay_amt2: 0,
    pay_amt3: 0,
    pay_amt4: 0,
    pay_amt5: 0,
    pay_amt6: 0,
  });

  const handleChange = (field: keyof PredictionInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const tabs = [
    { title: "Basic Info", value: "basic" },
    { title: "Payment History", value: "payment" },
    { title: "Bill Amounts", value: "bills" },
    { title: "Payment Amounts", value: "payments" },
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            containerClassName="mb-6"
          />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {activeTab === "basic" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="limit_bal">Credit Limit</Label>
                    <Input
                      id="limit_bal"
                      type="number"
                      value={formData.limit_bal}
                      onChange={handleChange("limit_bal")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange("age")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sex">Sex (1=M, 2=F)</Label>
                    <Input
                      id="sex"
                      type="number"
                      min="1"
                      max="2"
                      value={formData.sex}
                      onChange={handleChange("sex")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education (1-4)</Label>
                    <Input
                      id="education"
                      type="number"
                      min="1"
                      max="4"
                      value={formData.education}
                      onChange={handleChange("education")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marriage">Marital (1-3)</Label>
                    <Input
                      id="marriage"
                      type="number"
                      min="1"
                      max="3"
                      value={formData.marriage}
                      onChange={handleChange("marriage")}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "payment" && (
              <div className="grid grid-cols-3 gap-4">
                {[0, 2, 3, 4, 5, 6].map((month) => (
                  <div key={month}>
                    <Label htmlFor={`pay_${month}`}>
                      Pay Status {month === 0 ? "Current" : `M-${month}`}
                    </Label>
                    <Input
                      id={`pay_${month}`}
                      type="number"
                      value={formData[`pay_${month}` as keyof PredictionInput] as number}
                      onChange={handleChange(`pay_${month}` as keyof PredictionInput)}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "bills" && (
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((month) => (
                  <div key={month}>
                    <Label htmlFor={`bill_amt${month}`}>Bill Amount M-{month}</Label>
                    <Input
                      id={`bill_amt${month}`}
                      type="number"
                      value={formData[`bill_amt${month}` as keyof PredictionInput] as number}
                      onChange={handleChange(`bill_amt${month}` as keyof PredictionInput)}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "payments" && (
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((month) => (
                  <div key={month}>
                    <Label htmlFor={`pay_amt${month}`}>Payment M-{month}</Label>
                    <Input
                      id={`pay_amt${month}`}
                      type="number"
                      value={formData[`pay_amt${month}` as keyof PredictionInput] as number}
                      onChange={handleChange(`pay_amt${month}` as keyof PredictionInput)}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Default Risk"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
