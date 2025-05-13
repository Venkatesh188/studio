
'use client';

import type { UseFormSetValue, FieldValues, Path, UseFormGetValues } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type React from 'react';
import { useRef } from 'react';
import { ImagePlus } from 'lucide-react';

interface ImageInsertButtonProps<T extends FieldValues> {
  formSetValue: UseFormSetValue<T>;
  formGetValues: UseFormGetValues<T>;
  fieldName: Path<T>;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  buttonText?: string;
  maxSizeMB?: number;
}

export function ImageInsertButton<T extends FieldValues>({
  formSetValue,
  formGetValues,
  fieldName,
  textareaRef,
  buttonText = "Insert Image",
  maxSizeMB = 2,
}: ImageInsertButtonProps<T>) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: `Please select an image smaller than ${maxSizeMB}MB to embed.`,
          variant: "destructive",
        });
        if(fileInputRef.current) fileInputRef.current.value = ""; // Reset
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        // Using a more standard and potentially responsive image tag
        const imgTag = `<p><img src="${dataUri}" alt="Embedded Image" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem auto; display: block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" /></p>\n`;
        
        const currentContent = formGetValues(fieldName) as string | undefined | null;
        formSetValue(fieldName, (currentContent || '') + imgTag, { shouldValidate: true });
        
        if (textareaRef?.current) {
          textareaRef.current.focus();
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      };
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "Could not read the selected image file.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset file input to allow selecting the same file again if needed
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center"
      >
        <ImagePlus className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </>
  );
}
