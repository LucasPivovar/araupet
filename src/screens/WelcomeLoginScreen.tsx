import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TopBar } from '../components/TopBar';
import { AddPetModal } from '../components/Modals/AddPetModal';
import { ForgotPasswordModal } from '../components/Onboarding/ForgotPasswordModal';
import { IntroView } from '../components/Onboarding/IntroView';
import { LoginView } from '../components/Onboarding/LoginView';
import { StepOneView } from '../components/Onboarding/StepOneView';
import { StepTwoView } from '../components/Onboarding/StepTwoView';
import { StepThreeView } from '../components/Onboarding/StepThreeView';
import { SuccessView } from '../components/Onboarding/SuccessView';
import { PetStepView } from '../components/Onboarding/PetStepView';
import { Pet } from '../types';
import { CURRENT_USER, MY_PET } from '../data/mockData';

interface WelcomeLoginScreenProps {
  onLoginSuccess: (user?: typeof CURRENT_USER, pets?: Pet[]) => void;
}

type AuthMode =
  | 'intro'
  | 'login'
  | 'step-1'
  | 'step-2'
  | 'step-3'
  | 'account-created'
  | 'pet-step';

export const WelcomeLoginScreen: React.FC<WelcomeLoginScreenProps> = ({
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>('intro');

  // Login & Forgot state
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('juliana.lima@email.com');

  // Step 1 state: Nome & Data de Nascimento
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Step 2 state: CPF & Endereço
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('Iguaçu');

  // Step 3 state: Contato & Senha
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  // User avatar
  const [userAvatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  );

  // Pets registered during onboarding
  const [onboardingPets, setOnboardingPets] = useState<Pet[]>([]);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

  // Handlers
  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onLoginSuccess();
    }, 400);
  };

  const handleStepThreeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
      setMode('account-created');
    }, 600);
  };

  const handleSavePet = (pet: Pet) => {
    setOnboardingPets((prev) => [...prev, pet]);
  };

  const handleFinishOnboarding = () => {
    const createdUser = {
      name: fullName.trim() || CURRENT_USER.name,
      firstName: fullName.trim().split(' ')[0] || CURRENT_USER.firstName,
      email: email.trim() || CURRENT_USER.email,
      city: `${neighborhood}, Araucária - PR`,
      avatar: userAvatar,
    };
    const finalPets = onboardingPets.length > 0 ? onboardingPets : [MY_PET];
    onLoginSuccess(createdUser, finalPets);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden select-none relative h-full">
      <TopBar showBack={false} transparent={true} darkIcons={true} />

      <div className="px-6 pt-2 pb-5 flex-1 flex flex-col max-w-md mx-auto w-full min-h-0 overflow-y-auto no-scrollbar">
        {mode === 'intro' && (
          <IntroView
            onStartOnboarding={() => setMode('step-1')}
            onGoToLogin={() => setMode('login')}
          />
        )}

        {mode === 'login' && (
          <LoginView
            onBack={() => setMode('intro')}
            onLogin={handleLogin}
            onForgotPassword={(em) => {
              setForgotEmail(em || 'juliana.lima@email.com');
              setShowForgotModal(true);
            }}
            onGoToRegister={() => setMode('step-1')}
            isLoading={isLoggingIn}
          />
        )}

        {mode === 'step-1' && (
          <StepOneView
            fullName={fullName}
            setFullName={setFullName}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            onNext={() => setMode('step-2')}
            onBack={() => setMode('intro')}
            onGoToLogin={() => setMode('login')}
          />
        )}

        {mode === 'step-2' && (
          <StepTwoView
            cpf={cpf}
            setCpf={setCpf}
            cep={cep}
            setCep={setCep}
            street={street}
            setStreet={setStreet}
            neighborhood={neighborhood}
            setNeighborhood={setNeighborhood}
            onNext={() => setMode('step-3')}
            onBack={() => setMode('step-1')}
          />
        )}

        {mode === 'step-3' && (
          <StepThreeView
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            onSubmit={handleStepThreeSubmit}
            onBack={() => setMode('step-2')}
            isRegistering={isRegistering}
          />
        )}

        {mode === 'account-created' && (
          <SuccessView
            fullName={fullName}
            avatar={userAvatar}
            onNext={() => setMode('pet-step')}
          />
        )}

        {mode === 'pet-step' && (
          <PetStepView
            pets={onboardingPets}
            onOpenAddPetModal={() => setIsAddPetModalOpen(true)}
            onFinish={handleFinishOnboarding}
          />
        )}
      </div>

      <AddPetModal
        isOpen={isAddPetModalOpen}
        onClose={() => setIsAddPetModalOpen(false)}
        onSavePet={handleSavePet}
        tutorName={fullName || 'Juliana Lima'}
      />

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        defaultEmail={forgotEmail}
      />
    </div>
  );
};
