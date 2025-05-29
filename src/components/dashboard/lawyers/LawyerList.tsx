'use client';

import { useState } from 'react';
import { UserWithProfile } from '@/api/types/user';
import { CreateLawyerProfileDTO } from '@/api/types/lawyer-profile';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Users, Pencil, UserPlus, AlertTriangle } from 'lucide-react';
import { useCreateLawyerProfile, useUpdateLawyerProfile } from '@/hooks/useLawyerProfile';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { LawyerFormModal } from './modals/LaywerProfile';

interface LawyerListProps {
  lawyers: UserWithProfile[];
}

export function LawyerList({ lawyers }: LawyerListProps) {
  const [selected, setSelected] = useState<UserWithProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateLawyerProfileDTO>({
    firstName: '',
    lastName: '',
    middleName: '',
    lawFirm: '',
    specialization: '',
    licenseNumber: '',
    yearsOfExperience: 0,
    bio: '',
    certifications: [],
    languages: [],
  });

  const queryClient = useQueryClient();

  const createProfile = useCreateLawyerProfile({
    onSuccess: () => {
      toast.success('Профіль створено');
      close();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Не вдалося створити профіль'),
  });

  const updateProfile = useUpdateLawyerProfile({
    onSuccess: () => {
      toast.success('Профіль оновлено');
      close();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Не вдалося оновити профіль'),
  });

  function open(lawyer: UserWithProfile) {
    setSelected(lawyer);
    if (lawyer.lawyerProfile) {
      const p = lawyer.lawyerProfile!;
      setFormData({
        firstName: p.firstName,
        lastName: p.lastName,
        middleName: p.middleName || '',
        lawFirm: p.lawFirm || '',
        specialization: p.specialization || '',
        licenseNumber: p.licenseNumber || '',
        yearsOfExperience: p.yearsOfExperience || 0,
        bio: p.bio || '',
        certifications: p.certifications || [],
        languages: p.languages || [],
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        lawFirm: '',
        specialization: '',
        licenseNumber: '',
        yearsOfExperience: 0,
        bio: '',
        certifications: [],
        languages: [],
      });
    }
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setSelected(null);
  }

  function handleSubmit() {
    if (!selected) return;
    const payload = { userId: selected.id, ...formData };
    if (selected.lawyerProfile) {
      updateProfile.mutate(payload);
    } else {
      createProfile.mutate(payload);
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ім’я</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Спеціалізація</TableHead>
            <TableHead>Юридична компанія</TableHead>
            <TableHead>Досвід</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lawyers.map(lawyer => (
            <TableRow key={lawyer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {lawyer.lawyerProfile ? (
                        `${lawyer.lawyerProfile.firstName[0]}${lawyer.lawyerProfile.lastName[0]}`
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {lawyer.lawyerProfile ? (
                      <p className="font-medium">
                        {lawyer.lawyerProfile.firstName} {lawyer.lawyerProfile.lastName}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <p className="text-sm text-muted-foreground">Профіль не заповнено</p>
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{lawyer.email}</TableCell>
              <TableCell>{lawyer.lawyerProfile?.specialization || '-'}</TableCell>
              <TableCell>{lawyer.lawyerProfile?.lawFirm || '-'}</TableCell>
              <TableCell>
                {lawyer.lawyerProfile?.yearsOfExperience
                  ? `${lawyer.lawyerProfile.yearsOfExperience} років`
                  : '-'}
              </TableCell>
              <TableCell>
                <Badge variant={lawyer.isEmailVerified ? 'default' : 'secondary'}>
                  {lawyer.isEmailVerified ? 'Підтверджено' : 'Не підтверджено'}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant={lawyer.lawyerProfile ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => open(lawyer)}
                  className="w-[130px] justify-start"
                >
                  {lawyer.lawyerProfile ? (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Редагувати
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Додати профіль
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <LawyerFormModal
        isOpen={isOpen}
        onOpenChange={open => !open && close()}
        userId={selected?.id || null}
        hasProfile={Boolean(selected?.lawyerProfile)}
        availableUsers={lawyers}
        profileData={formData}
        isSubmitting={createProfile.isPending || updateProfile.isPending}
        onUserChange={id => {
          const u = lawyers.find(l => l.id === id) || null;
          if (u) open(u);
        }}
        onChange={patch => setFormData(fd => ({ ...fd, ...patch }))}
        onSubmit={handleSubmit}
      />
    </>
  );
}
