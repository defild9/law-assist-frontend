'use client';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Label } from '@/components/ui/Label';
import { User, Camera } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { useSession } from 'next-auth/react';
import { UpdateUserResponse } from '@/api/types/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserInput, updateUserSchema } from '@/libs/validation/profile';

const UpdateProfileForm = () => {
  const { data: session, update } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isPending, mutate } = useUpdateUser({
    onSuccess: (response: UpdateUserResponse) => {
      if (update && session) {
        const { email, profile_picture } = response.data;
        update({
          user: {
            ...session.user,
            email,
          },
          userImage: profile_picture,
        });
      }
    },
    onError: error => {
      console.error(error);
    },
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (session?.user) {
      if (session.user.email) {
        setValue('email', session.user.email);
      }
      if (typeof session.userImage === 'string') {
        setPreview(session.userImage);
      }
    }
  }, [session, setValue]);

  const onSubmit = (data: UpdateUserInput) => {
    mutate({
      email: data.email || undefined,
      profile_picture: file ?? undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture and personal details</CardDescription>
            </div>
            <Button variant="outline" onClick={handleSubmit(onSubmit)} disabled={isPending}>
              {isPending ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              {preview ? (
                <AvatarImage src={preview} alt="Preview" />
              ) : (
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
              Change Picture
            </Button>
          </div>

          <div className="grid gap-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateProfileForm;
