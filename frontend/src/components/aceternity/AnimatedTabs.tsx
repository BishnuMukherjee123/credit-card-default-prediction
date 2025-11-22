import './aceternity.css'
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

export const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
  containerClassName,
  activeTabClassName,
  tabClassName,
}: {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
        containerClassName
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
            tabClassName,
            activeTab === tab.value
              ? "text-white"
              : "text-neutral-400 hover:text-neutral-200"
          )}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="active-tab"
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full",
                activeTabClassName
              )}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.title}</span>
        </button>
      ))}
    </div>
  );
};
