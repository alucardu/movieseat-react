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
    if (promptable) {
      console.log(promptable.prompt());
      return promptable.prompt();
    }
    return Promise.reject(
        new Error(
            'Tried installing before browser sent "beforeinstallprompt" event',
        ),
    );
  };

  React.useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      window.deferredPrompt = e;
      console.log(window.deferredPrompt);
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
