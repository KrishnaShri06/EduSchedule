import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  status?: 'success' | 'warning' | 'error' | 'neutral';
}

export function KPICard({ title, value, subtitle, icon, trend, status = 'neutral' }: KPICardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.value > 0) {
      return <TrendingUp className="h-3 w-3 text-success" />;
    } else if (trend.value < 0) {
      return <TrendingDown className="h-3 w-3 text-destructive" />;
    }
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'border-l-4 border-l-success';
      case 'warning':
        return 'border-l-4 border-l-warning';
      case 'error':
        return 'border-l-4 border-l-destructive';
      default:
        return '';
    }
  };

  return (
    <Card className={`kpi-card ${getStatusClass()} hover:scale-[1.02] transition-transform`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2 text-xs">
            {getTrendIcon()}
            <span className={`ml-1 ${
              trend.value > 0 ? 'text-success' : 
              trend.value < 0 ? 'text-destructive' : 
              'text-muted-foreground'
            }`}>
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}