import { User, UserRoles } from '@/app/lib/models';
import { updateUser, deleteUser } from '@/app/services/actions-users';
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export function ToggleUserRole({ user }: { user: User }) {
  const toggleUserRole = () => {
    console.log(user);
    user.role = user.role === 'admin' ? UserRoles.customer : UserRoles.admin;
    updateUser(user);
  };

  return (
    <button
      onClick={toggleUserRole}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">
        {user.role === 'admin' ? '设为用户' : '设为管理员'}
      </span>
      {user.role === 'admin' ? (
        <ShieldCheckIcon className="w-4" />
      ) : (
        <ShieldExclamationIcon className="w-4" />
      )}
    </button>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const deleteUserWithId = () => {
    console.log(id);
    deleteUser(id);
  };

  return (
    <button
      onClick={deleteUserWithId}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  );
}
