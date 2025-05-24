'use client';

import * as React from 'react';
import { UserWithProfile } from '@/api/types/user';
import { CreateLawyerProfileDTO } from '@/api/types/lawyer-profile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';

interface LawyerFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  hasProfile: boolean;
  availableUsers: UserWithProfile[];
  profileData: CreateLawyerProfileDTO;
  isSubmitting: boolean;
  onUserChange: (id: string) => void;
  onChange: (data: Partial<CreateLawyerProfileDTO>) => void;
  onSubmit: () => void;
}

export const LawyerFormModal = ({
  isOpen,
  onOpenChange,
  userId,
  hasProfile,
  availableUsers,
  profileData,
  isSubmitting,
  onUserChange,
  onChange,
  onSubmit,
}: LawyerFormModalProps) => {
  const isNew = !hasProfile;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Create Lawyer Profile' : 'Edit Lawyer Profile'}</DialogTitle>
          <DialogDescription>
            {isNew
              ? 'Select a user and fill out their lawyer profile.'
              : 'Update the lawyer profile fields below.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Select value={userId || ''} onValueChange={onUserChange} disabled={true}>
            <SelectTrigger>
              <SelectValue placeholder="Select user…" />
            </SelectTrigger>
            <SelectContent>
              {availableUsers.map(u => (
                <SelectItem key={u.id} value={u.id}>
                  {u.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              value={profileData.firstName}
              onChange={e => onChange({ firstName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={profileData.lastName}
              onChange={e => onChange({ lastName: e.target.value })}
            />
            <Input
              placeholder="Middle Name"
              value={profileData.middleName}
              onChange={e => onChange({ middleName: e.target.value })}
            />
            <Input
              placeholder="Law Firm"
              value={profileData.lawFirm}
              onChange={e => onChange({ lawFirm: e.target.value })}
            />
          </div>

          <Input
            placeholder="Specialization"
            value={profileData.specialization}
            onChange={e => onChange({ specialization: e.target.value })}
          />

          <Input
            placeholder="License Number"
            value={profileData.licenseNumber}
            onChange={e => onChange({ licenseNumber: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Years of Experience"
            value={String(profileData.yearsOfExperience)}
            onChange={e => onChange({ yearsOfExperience: parseInt(e.target.value, 10) })}
          />

          <Textarea
            placeholder="Bio"
            value={profileData.bio}
            onChange={e => onChange({ bio: e.target.value })}
          />

          <Input
            placeholder="Certifications (comma separated)"
            value={profileData.certifications?.join(', ') || ''}
            onChange={e =>
              onChange({ certifications: e.target.value.split(',').map(s => s.trim()) })
            }
          />

          <Input
            placeholder="Languages (comma separated)"
            value={profileData.languages?.join(', ') || ''}
            onChange={e => onChange({ languages: e.target.value.split(',').map(s => s.trim()) })}
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting || (!userId && isNew)}>
            {isSubmitting ? 'Saving…' : isNew ? 'Create Profile' : 'Update Profile'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
