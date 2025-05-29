"use client";

import { cn } from "@/lib/utils";
import { Image, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";

interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  preview?: string | null;
  onFileSelect?: (file: File | null) => void;
}

const PictureInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, preview, onChange, onFileSelect, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);

    useEffect(() => {
      if (preview) {
        setPreviewUrl(preview);
      }
    }, [preview]);

    const handleFileChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
          onFileSelect?.(file);
        } else {
          setPreviewUrl(null);
          onFileSelect?.(null);
        }
        onChange?.(event);
      },
      [onChange, onFileSelect]
    );

    const handleRemove = useCallback(() => {
      setPreviewUrl(null);
      onFileSelect?.(null);
      if (props.name) {
        const event = new Event("change", { bubbles: true });
        Object.defineProperty(event, "target", {
          writable: false,
          value: { name: props.name, value: null },
        });
        window.dispatchEvent(event);
      }
    }, [onFileSelect, props.name]);

    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border">
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-0 top-0 h-4 w-4 rounded-none rounded-bl"
                onClick={handleRemove}
              >
                <X className="h-2 w-2" />
              </Button>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Image className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={ref}
          {...props}
          className="hidden"
          tabIndex={-1}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const input = ref as React.MutableRefObject<HTMLInputElement>;
            if (input.current) {
              input.current.click();
            }
          }}
        >
          Choose image
        </Button>
      </div>
    );
  }
);

PictureInput.displayName = "PictureInput";

export { PictureInput };
