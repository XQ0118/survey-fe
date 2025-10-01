import { cn } from '@/utils/cn';
import { useState, useCallback, useRef } from 'react';
import { Button, Popover, Textarea } from '@mantine/core';

interface InlineInputPopoverProps {
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  maxDisplayLength?: number; // 最大显示字符数
}

export function InlineInputPopover({
  placeholder = '请输入',
  defaultValue = '',
  onValueChange,
  className,

}: InlineInputPopoverProps) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (!isComposing) {
      onValueChange?.(newValue);
    }
  }, [isComposing, onValueChange]);

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false);
    onValueChange?.(e.currentTarget.value);
  }, [onValueChange]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Popover
      opened={isOpen}
      onChange={setIsOpen}
      position="bottom-start"
      width={300}
      shadow="md"
    >
      <Popover.Target>
        <span
          onClick={handleOpen}
          className={cn(
            "inline-block",
            "border-0 border-b-2 border-dashed border-gray-300",
            "bg-transparent",
            "px-1 py-0",
            "cursor-pointer",
            "transition-all duration-200",
            "hover:border-blue-400 hover:bg-blue-50/30",
            "min-w-[10ch]",
            !value && "text-gray-400",
            className
          )}
        >
          {value || placeholder}
        </span>
      </Popover.Target>

      <Popover.Dropdown>

        <Textarea
          ref={textareaRef}
          autosize
          value={value}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          minRows={4}
          maxRows={10}
          
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button
            onClick={() => setIsOpen(false)}
          >
            确定
          </Button>
        </div>

      </Popover.Dropdown>
    </Popover>
  );
}
