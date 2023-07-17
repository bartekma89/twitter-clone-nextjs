import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

import useUsers from '@/hooks/useUsers';
import useEditModal from '@/hooks/useEditModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Modal, Input, ImageUpload } from '@/components';

const LoginModal = () => {
  const editModal = useEditModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateUsers } = useUsers();

  const [profileImage, setProfileImage] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const refreshPage = useCallback(() => router.replace(router.asPath), [router]);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage ?? '');
    setCoverImage(currentUser?.coverImage ?? '');
    setName(currentUser?.name ?? '');
    setUsername(currentUser?.username ?? '');
    setBio(currentUser?.bio ?? '');
  }, [currentUser]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateUsers();
      refreshPage();

      toast.success('Updated!');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [bio, coverImage, editModal, mutateUsers, name, profileImage, refreshPage, username]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label='Upload profile image'
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label='Upload cover image'
      />
      <Input
        placeholder='Name'
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder='Username'
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder='Bio'
        value={bio}
        disabled={isLoading}
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default LoginModal;
