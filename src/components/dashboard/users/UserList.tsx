'use client';
import { useState } from 'react';
import { UserWithProfile, UserRole } from '@/api/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Users, MoreVertical, Trash2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { DeleteUserModal } from './modals/DeleteUserModal';
import useDialog from '@/hooks/useDialog';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import { useChangeUserRole } from '@/hooks/useUsers';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ChangeRoleModal } from './modals/ChangeRoleModal';

interface UserListProps {
  users: UserWithProfile[];
  isLoading?: boolean;
}

export function UserList({ users, isLoading }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);

  const [roleDialog, setRoleDialog] = useState<{
    isOpen: boolean;
    user: UserWithProfile | null;
    newRole: UserRole | null;
  }>({ isOpen: false, user: null, newRole: null });
  const { isVisible: isVisibleDelete, open: openDelete, close: closeDelete } = useDialog();
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser({
    onSuccess: () => {
      toast.success('User deleted successfully');
      closeDelete();
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const { mutate: changeUserRole, isPending: isChangingRole } = useChangeUserRole({
    onSuccess: (_data, { role }) => {
      toast.success(`Role changed to ${role}`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setRoleDialog({ isOpen: false, user: null, newRole: null });
    },
    onError: () => {
      toast.error('Failed to change role');
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="text-center py-6 text-muted-foreground">No users found</div>
              </TableCell>
            </TableRow>
          ) : (
            users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {user.profile_picture ? (
                        <AvatarImage src={user.profile_picture} alt={user.email} />
                      ) : (
                        <AvatarFallback>
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.email.split('@')[0]}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.isEmailVerified ? 'default' : 'secondary'}>
                    {user.isEmailVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {user.role}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Change role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {(['user', 'admin', 'lawyer'] as UserRole[]).map(role => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => setRoleDialog({ isOpen: true, user, newRole: role })}
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{format(new Date(user.createdAt), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedUser(user);
                          openDelete();
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DeleteUserModal
        open={isVisibleDelete}
        onOpenChange={closeDelete}
        isDeleting={isDeleting}
        onDelete={() => {
          if (selectedUser) deleteUser(selectedUser.id);
        }}
      />
      <ChangeRoleModal
        open={roleDialog.isOpen}
        onOpenChange={isOpen =>
          !isOpen && setRoleDialog({ isOpen: false, user: null, newRole: null })
        }
        userEmail={roleDialog.user?.email || ''}
        newRole={roleDialog.newRole || ''}
        isChanging={isChangingRole}
        onConfirm={() => {
          if (roleDialog.user && roleDialog.newRole) {
            changeUserRole({
              userId: roleDialog.user.id,
              role: roleDialog.newRole,
            });
          }
        }}
      />
    </>
  );
}
