'use server';

import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import { blockUser, unblockUser } from '@/lib/block-service';

export const onBlock = async (id: string) => {
  const self = await getSelf();

  //   let blockedUser;

  //   try {
  //     blockedUser = await blockUser(id);
  //   } catch {
  //     // This means user is a guest
  //   }

  //   revalidatePath(`/u/${self.username}/community`);

  const blockedUser = await blockUser(id);

  revalidatePath('/');

  if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);

  //   revalidatePath(`/u/${self.username}/community`);

  if (unblockedUser) revalidatePath(`/${unblockedUser.blocked.username}`);

  return unblockedUser;
};
