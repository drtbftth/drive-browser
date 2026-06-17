"use client";

import { useFiles } from "@/hooks/use-files";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HardDrive, FileText, FileImage, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export function StatsCards() {
  const { data, isLoading, isError } = useFiles();

  if (isError) return null;

  const stats = [
    {
      title: "Total Files",
      value: data?.stats.totalFiles || 0,
      icon: LayoutGrid,
      color: "text-blue-500",
    },
    {
      title: "Total Storage",
      value: data?.stats.totalSize ? formatBytes(data.stats.totalSize) : "0 B",
      icon: HardDrive,
      color: "text-purple-500",
    },
    {
      title: "Documents",
      value: (data?.stats.fileTypes['PDF'] || 0) + (data?.stats.fileTypes['Document'] || 0),
      icon: FileText,
      color: "text-emerald-500",
    },
    {
      title: "Media",
      value: (data?.stats.fileTypes['Image'] || 0) + (data?.stats.fileTypes['Video'] || 0),
      icon: FileImage,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20 rounded-md" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
