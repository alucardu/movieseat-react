import * as React from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly deferredPrompt: any;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window { deferredPrompt: any; }
}

export const useAddToHomescreenPrompt = (): [
  IBeforeInstallPromptEvent | null,
  () => void,
  boolean
  ] => {
  const [
    promptable,
    setPromptable,
  ] = React.useState<IBeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] = React.useState(false);

  const promptToInstall = () => {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('user accepted A2HS prompt');
          } else {
            console.log('user dismissed A2HS prompt');
          }
        });
  };

  React.useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      window.deferredPrompt = e;
      e.preventDefault();
      setPromptable(e);
    };

    window.addEventListener('beforeinstallprompt', ready as any);

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any);
    };
  }, []);

  React.useEffect(() => {
    const onInstall = () => {
      setIsInstalled(true);
    };

    window.addEventListener('appinstalled', onInstall as any);

    return () => {
      window.removeEventListener('appinstalled', onInstall as any);
    };
  }, []);

  return [promptable, promptToInstall, isInstalled];
};
