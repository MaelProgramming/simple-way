// Notification.ts - Gestion des notifications du navigateur pour le framework

export type NotificationOptions = {
  body?: string;
  icon?: string;
  tag?: string;
  silent?: boolean;
  data?: any;
};

/**
 * 🔔 Vérifie si les notifications sont supportées.
 */
function isNotificationSupported(): boolean {
  return "Notification" in window;
}

/**
 * 📩 Demande la permission pour afficher des notifications si ce n'est pas déjà accordé.
 */
async function requestPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) {
    console.warn("Les notifications ne sont pas supportées par ce navigateur.");
    return "denied";
  }

  if (Notification.permission === "default") {
    return await Notification.requestPermission();
  }

  return Notification.permission;
}

/**
 * ⚡ Crée une notification navigateur.
 * @param title - Titre de la notification
 * @param options - Options (body, icon, tag, etc.)
 * @param onClick - Callback au clic sur la notification
 */
async function createNotification(
  title: string,
  options: NotificationOptions = {},
  onClick?: () => void
): Promise<Notification | null> {
  if (!isNotificationSupported()) return null;

  const permission = await requestPermission();
  if (permission !== "granted") {
    console.warn("Permission refusée pour les notifications.");
    return null;
  }

  const notif = new Notification(title, options);
  if (onClick) notif.onclick = onClick;

  return notif;
}

/**
 * 🔔 Composant Notification pour le framework
 */
const NotificationComponent = {
  create: createNotification,
  requestPermission,
  isSupported: isNotificationSupported,
};

export { NotificationComponent as Notification };
