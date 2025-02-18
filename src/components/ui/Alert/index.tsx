import { FC } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface AlertProps {
  text: string | null;
  visible?: boolean;
  description?: string;
  variant: "success" | "error" | "warning";
}

const Alert: FC<AlertProps> = ({ text, description, variant, visible = false }) => {
  if (visible == false) return null;

  const variantStyles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-700" />,
    error: <XCircle className="w-5 h-5 text-red-700" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-700" />,
  };

  return (
    <div className={`flex items-start p-3 border-l-4 rounded-md m-1 ${variantStyles[variant]}`}>
      <div className="mr-3">{icons[variant]}</div>
      <div>
        <p className="font-semibold">{text}</p>
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
