import React, { useState } from 'react';
import { ScreenId, NavTabId } from './types';
import { BottomNav } from './components/BottomNav';
import { WelcomeLoginScreen } from './screens/WelcomeLoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PetWalletScreen } from './screens/PetWalletScreen';
import { TelemedicineScreen } from './screens/TelemedicineScreen';
import { VaccinesScreen } from './screens/VaccinesScreen';
import { AdoptionScreen } from './screens/AdoptionScreen';
import { LostFoundScreen } from './screens/LostFoundScreen';
import { PartnersScreen } from './screens/PartnersScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SupportChatScreen } from './screens/SupportChatScreen';
import { CURRENT_USER, MY_PET } from './data/mockData';
import { Pet } from './types';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  const [unreadAlerts, setUnreadAlerts] = useState<number>(2);
  const [registeredPets, setRegisteredPets] = useState<Pet[]>([MY_PET]);
  const [currentUser, setCurrentUser] = useState<typeof CURRENT_USER>(CURRENT_USER);

  // Map screen to bottom nav tab
  const getActiveTab = (): NavTabId => {
    switch (currentScreen) {
      case 'home':
        return 'inicio';
      case 'vaccines':
      case 'adoption':
      case 'lostfound':
      case 'partners':
      case 'telemed':
        return 'servicos';
      case 'wallet':
        return 'carteira';
      case 'alerts':
        return 'alertas';
      case 'profile':
      case 'settings':
      case 'support':
        return 'perfil';
      default:
        return 'inicio';
    }
  };

  const handleSelectTab = (tab: NavTabId) => {
    switch (tab) {
      case 'inicio':
        setCurrentScreen('home');
        break;
      case 'servicos':
        setCurrentScreen('vaccines');
        break;
      case 'carteira':
        setCurrentScreen('wallet');
        break;
      case 'alertas':
        setCurrentScreen('alerts');
        break;
      case 'perfil':
        setCurrentScreen('profile');
        break;
    }
  };

  const handleLoginSuccess = (user?: typeof CURRENT_USER, pets?: Pet[]) => {
    if (user) {
      setCurrentUser(user);
    }
    if (pets && pets.length > 0) {
      setRegisteredPets(pets);
    }
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
      case 'register':
        return (
          <WelcomeLoginScreen
            onLoginSuccess={handleLoginSuccess}
          />
        );

      case 'home':
        return (
          <HomeScreen
            onNavigate={setCurrentScreen}
            unreadCount={unreadAlerts}
            currentUser={currentUser}
          />
        );
      case 'wallet':
        return (
          <PetWalletScreen
            onBack={() => setCurrentScreen('home')}
            pets={registeredPets}
            onAddPet={(pet) => setRegisteredPets((current) => [...current, pet])}
          />
        );
      case 'telemed':
        return <TelemedicineScreen onBack={() => setCurrentScreen('home')} />;
      case 'vaccines':
        return <VaccinesScreen onBack={() => setCurrentScreen('home')} />;
      case 'adoption':
        return <AdoptionScreen onBack={() => setCurrentScreen('home')} />;
      case 'lostfound':
        return <LostFoundScreen onBack={() => setCurrentScreen('home')} />;
      case 'partners':
        return <PartnersScreen onBack={() => setCurrentScreen('home')} />;
      case 'alerts':
        return (
          <AlertsScreen
            onBack={() => setCurrentScreen('home')}
            onNavigate={setCurrentScreen}
          />
        );
      case 'profile':
      case 'settings':
        return (
          <ProfileScreen
            onBack={() => setCurrentScreen('home')}
            onNavigate={setCurrentScreen}
            pets={registeredPets}
            onAddPet={(pet) => setRegisteredPets((current) => [...current, pet])}
            currentUser={currentUser}
          />
        );
      case 'support':
        return <SupportChatScreen onBack={() => setCurrentScreen('profile')} />;
      default:
        return (
          <HomeScreen
            onNavigate={setCurrentScreen}
            unreadCount={unreadAlerts}
            currentUser={currentUser}
          />
        );
    }
  };

  const isAuthScreen = currentScreen === 'login' || currentScreen === 'register';

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-teal-50/20 to-slate-200/80 flex flex-col items-center justify-center font-sans antialiased text-slate-800 selection:bg-[#008779] selection:text-white p-0 sm:p-4">
      {/* Centered Compact App Container (Max-Width 500px, Clean Light Theme) */}
      <div className="w-full max-w-[500px] h-screen sm:h-[94vh] bg-[#f8fafc] sm:rounded-[36px] shadow-2xl sm:shadow-slate-300/60 overflow-hidden flex flex-col relative sm:border sm:border-slate-200/90">
        {/* Active Screen Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {renderScreen()}
        </div>

        {/* Persistent Bottom Bar (Visible on all main screens) */}
        {!isAuthScreen && (
          <BottomNav
            activeTab={getActiveTab()}
            onSelectTab={handleSelectTab}
            unreadAlertsCount={unreadAlerts}
          />
        )}
      </div>
    </div>
  );
}

export default App;
