import { useState, useRef, FC } from "react";

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  initialImage?: string;
  label?: string;
  helperText?: string;
  containerStyles?: React.CSSProperties;
  id?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

const ImageUploader: FC<ImageUploaderProps> = ({
  onImageChange,
  initialImage = "",
  label = "Upload Image",
  helperText = "",
  containerStyles = {},
  id = `image-upload-${Math.random().toString(36).substr(2, 9)}`,
  required = false,
  size = "md",
}) => {
  const [previewUrl, setPreviewUrl] = useState(initialImage);
  const fileInputRef = useRef<any>(null);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-16 h-16";
      case "lg":
        return "w-32 h-32";
      case "md":
      default:
        return "w-24 h-24";
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (onImageChange) {
      onImageChange(null);
    }
  };

  const handleContainerClick = () => {
    if (!previewUrl && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2" style={containerStyles}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex items-center space-x-4">
        <div
          onClick={handleContainerClick}
          className={`${getSizeClasses()} border-2 border-dashed border-gray-500 rounded-md 
                       flex items-center justify-center cursor-pointer hover:border-blue-500
                       bg-gray-800 overflow-hidden relative transition-all duration-200`}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          ) : (
            <span className="text-gray-400 text-xs text-center p-2">Click to upload</span>
          )}

          <input
            ref={fileInputRef}
            type="file"
            id={id}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-xs text-red-400 hover:text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      {helperText && <p className="text-xs text-gray-400 mt-1">{helperText}</p>}
    </div>
  );
};

export default ImageUploader;
