import HomeLayout from './(home)/layout';
import { NotFoundImage } from '@/components/shared/NotFoundImage/NotFoundImage';

export default function NotFound() {
  return (
    <HomeLayout>
      <NotFoundImage />
    </HomeLayout>
  );
}
