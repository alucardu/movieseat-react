import * as React from 'react';

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
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
      e.preventDefault();
      setPromptable(e);
    };

    // window.addEventListener('beforeinstallprompt', ready as any);

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log(e);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // deferredPrompt = e;
    });

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
