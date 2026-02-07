import { type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProfileSetupModal from '../profile/ProfileSetupModal';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ProfileSetupModal />
    </div>
  );
}
