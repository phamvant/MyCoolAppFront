import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface AvatarUploadProps {
  initialImage?: string;
  initials: string;
  onImageChange?: (file: File | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  initialImage,
  initials,
  onImageChange
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange?.(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange?.(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative group">
        <div 
          className={`h-20 w-20 rounded-full flex items-center justify-center overflow-hidden
            ${!preview ? 'bg-blue-100' : ''}`}
        >
          {preview ? (
            <img 
              src={preview} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-blue-600 text-2xl font-semibold">{initials}</span>
          )}
        </div>
        
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 
            group-hover:opacity-100 transition-opacity duration-200 flex items-center 
            justify-center cursor-pointer"
          onClick={handleClick}
        >
          <Upload className="w-6 h-6 text-white" />
        </div>

        {preview && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 
              hover:bg-red-600 transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        className="px-4 py-2 text-sm text-blue-600 border border-blue-600 
          rounded-lg hover:bg-blue-50 transition-colors duration-150"
      >
        Change Avatar
      </button>
    </div>
  );
};

export default AvatarUpload;
