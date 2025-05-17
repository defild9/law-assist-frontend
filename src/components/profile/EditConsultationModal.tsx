'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/Select';
import { format } from 'date-fns';
import { ConsultationStatus } from '@/api/types/video-consultation';
import { Calendar } from '../ui/Calendat';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';

interface EditConsultationModalProps {
  open: boolean;
  onClose: () => void;
  consultationId: string;
  currentStatus: ConsultationStatus;
  currentDate: string;
  onSave: (status: ConsultationStatus, newDate: string) => void;
}

const EditConsultationModal: React.FC<EditConsultationModalProps> = ({
  open,
  onClose,
  currentStatus,
  currentDate,
  onSave,
}) => {
  const [status, setStatus] = useState<ConsultationStatus>(currentStatus);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(currentDate));

  useEffect(() => {
    setStatus(currentStatus);
    setSelectedDate(new Date(currentDate));
  }, [currentStatus, currentDate]);

  const handleSave = () => {
    onSave(status, selectedDate.toISOString());
  };

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Consultation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select value={status} onValueChange={v => setStatus(v as ConsultationStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status">{status}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.values(ConsultationStatus).map(s => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Calendar selected={selectedDate} onSelect={date => setSelectedDate(date)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              className="w-full border rounded px-2 py-1"
              value={format(selectedDate, 'HH:mm')}
              onChange={e => {
                const [hours, minutes] = e.target.value.split(':').map(Number);
                const updated = new Date(selectedDate);
                updated.setHours(hours, minutes);
                setSelectedDate(updated);
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditConsultationModal;
