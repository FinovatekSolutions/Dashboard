import Link from 'next/link';
import HomeLayout from './(home)/layout';
import { NotFoundImage } from '@/components/NotFoundImage/NotFoundImage';

export default function NotFound() {
  return (
    <HomeLayout>
       <NotFoundImage />
    </HomeLayout>
  );
}
