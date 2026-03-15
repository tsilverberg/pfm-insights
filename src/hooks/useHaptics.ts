import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

export function useHaptics() {
  const light = async () => {
    if (isNative) await Haptics.impact({ style: ImpactStyle.Light });
  };

  const medium = async () => {
    if (isNative) await Haptics.impact({ style: ImpactStyle.Medium });
  };

  const heavy = async () => {
    if (isNative) await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  const success = async () => {
    if (isNative) await Haptics.notification({ type: NotificationType.Success });
  };

  const warning = async () => {
    if (isNative) await Haptics.notification({ type: NotificationType.Warning });
  };

  const error = async () => {
    if (isNative) await Haptics.notification({ type: NotificationType.Error });
  };

  return { light, medium, heavy, success, warning, error };
}
