"use client";

import { motion } from "framer-motion";

interface ModelBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export default function ModelBar({ label, value, maxValue, color }: ModelBarProps) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between font-mono text-sm uppercase">
        <span className="text-gray-300">{label}</span>
        <span className="font-bold text-white">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      <div className="h-5 overflow-hidden rounded-full border border-white/10 bg-[#161618]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ backgroundColor: color }}
          className="h-full"
        />
      </div>
    </div>
  );
}
