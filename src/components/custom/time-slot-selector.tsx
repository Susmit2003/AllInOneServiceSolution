
"use client";

import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, Clock } from 'lucide-react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeRanges = ["09:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00"];

interface TimeSlotSelectorProps {
    selectedSlots: string[];
    onSelectionChange: (slots: string[]) => void;
}

export function TimeSlotSelector({ selectedSlots, onSelectionChange }: TimeSlotSelectorProps) {
  
  const handleTimeSlotChange = (slot: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedSlots, slot]);
    } else {
      onSelectionChange(selectedSlots.filter(s => s !== slot));
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary"/> Available Time Slots</Label>
      <div className="space-y-3 max-h-80 overflow-y-auto p-1 rounded-md border">
        {daysOfWeek.map(day => (
          <div key={day} className="p-3 rounded-md bg-secondary/30">
            <h4 className="font-medium mb-2 text-sm">{day}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
              {timeRanges.map(timeRange => {
                const slotIdentifier = `${day} ${timeRange}`;
                return (
                  <div key={slotIdentifier} className="flex items-center space-x-2">
                    <Checkbox
                      id={slotIdentifier}
                      checked={selectedSlots.includes(slotIdentifier)}
                      onCheckedChange={(checked) => handleTimeSlotChange(slotIdentifier, !!checked)}
                    />
                    <Label htmlFor={slotIdentifier} className="text-xs font-normal flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground"/> {timeRange}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
