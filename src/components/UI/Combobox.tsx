import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/UI/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/UI/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/Popover';

export function Combobox({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : `Select ${title}...`}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandEmpty>No {title} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (currentValue === value) return;
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
